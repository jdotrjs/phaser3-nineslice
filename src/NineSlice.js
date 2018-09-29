import Phaser from 'phaser'

import murmur from './murmur'

const defaultSliceConfig = sc => {
  const defaulted = sc
  if (typeof defaulted.sourceLayout.width === 'number') {
    // this means sourceLayout is a cornerconfig and should be used for all
    // four corners
    const { width, height } = defaulted.sourceLayout
    // we only need to assign one fallback will handle the rest
    defaulted.sourceLayout = { topLeft: { width, height } }
  }
  const sl = defaulted.sourceLayout

  sl.topRight = sl.topRight || sl.topLeft
  sl.bottomRight = sl.bottomRight || sl.topLeft
  sl.bottomLeft = sl.bottomLeft || sl.topLeft

  const maxTopHeight = Math.max(sl.topLeft.height, sl.topRight.height)
  const maxRightWidth = Math.max(sl.topRight.width, sl.bottomRight.width)
  const maxBottomHeight = Math.max(sl.bottomLeft.height, sl.bottomRight.height)
  const maxLeftWidth = Math.max(sl.topLeft.width, sl.bottomLeft.width)

  if (!defaulted.safeOffsets) {
    defaulted.safeOffsets = {
      top: maxTopHeight,
      right: maxRightWidth,
      bottom: maxBottomHeight,
      left: maxLeftWidth,
    }
  }

  if (
    typeof defaulted.minSizing === 'undefined' ||
    defaulted.minSizing !== false
  ) {
    const offsets = defaulted.safeOffsets
    defaulted.minSizing = {
      width: offsets
        ? Math.max(offsets.left + offsets.right, maxLeftWidth + maxRightWidth)
        : maxLeftWidth + maxRightWidth,
      height: offsets
        ? Math.max(offsets.top + offsets.bottom, maxTopHeight + maxBottomHeight)
        : maxTopHeight + maxBottomHeight,
    }
  } else {
    defaulted.minSizing = false
  }

  return defaulted
}

const shortSliceLayout = sc => ({
  tl: { x: sc.topLeft.width, y: sc.topLeft.height },
  tr: { x: sc.topRight.width, y: sc.topRight.height },
  bl: { x: sc.bottomLeft.width, y: sc.bottomLeft.height },
  br: { x: sc.bottomRight.width, y: sc.bottomRight.height },
})

const BASE = '__BASE'
const MISSING = '__MISSING'

export const EVENTS = {
  UPDATE_SAFE_BOUNDS: 'updatesafebounds',
}

export default class NineSlice extends Phaser.GameObjects.RenderTexture {
  /**
   * @param {Phaser.Scene} scene the parent scene for this NineSlice
   * @param {SliceConfig} _sliceConfig specifies details of where we source
   *    texture data and how the slice is laied out based on that texture.
   * @param {PositionConfig} positionConfig describes positioning of the slice
   *    in the scene. If unspecified x and y position will be 0 and the width
   *    and height will be computed from the source texture.
   */
  constructor(scene, _sliceConfig, positionConfig = null) {
    super(scene, 0, 0, 32, 32)

    this.initFrames = this.initFrames.bind(this)
    this.getUsableBounds = this.getUsableBounds.bind(this)
    this.drawFrames = this.drawFrames.bind(this)
    this.resize = this.resize.bind(this)
    this.updateSafeBounds = this.updateSafeBounds.bind(this)
    this.enableDebugDraw = this.enableDebugDraw.bind(this)

    this.events = new Phaser.Events.EventEmitter()
    this.sliceConfig = defaultSliceConfig(_sliceConfig)
    this._safeBounds = new Phaser.Geom.Rectangle()

    const { sourceKey, sourceFrame } = this.sliceConfig
    this.sourceTex = scene.sys.textures.get(this.sliceConfig.sourceKey)
    if (!sourceKey) {
      throw new Error('NineSlice requires a texture sourceKey to be specified.')
    }
    if (!this.sourceTex || this.sourceTex.key === MISSING) {
      throw new Error(`Expected source image ${sourceKey} not found.`)
    }

    // use this to reduce chance we'll overwrite an existing frame
    this._framePrefix = `${murmur(JSON.stringify({sourceKey, sourceFrame}, 404))}`
    // this constructs a namespaced frame name
    this.mkFrameName = n => `${this._framePrefix}-${n}`
    // store constructed frames so we have direct access to the frame for the
    // specific corners
    this._frameCache = {}

    const frameName =
      (typeof sourceFrame === 'string' || typeof sourceFrame === 'number')
        ? sourceFrame
        : BASE
    this.sourceFrame = this.sourceTex.get(frameName)

    // construct 9 frames for mortal men, doomed to die
    this.initFrames()

    // We've gotten everything setup that is necessary for normal operation so
    // we can unblock a bunch of the NineSlice specific stuff.
    this._initalized = true

    const {x, y, width, height} = positionConfig
    this.setPosition(x || 0, y || 0)
    this.resize(
      width || this.sourceFrame.width,
      height || this.sourceFrame.height)
    this.updateSafeBounds()
  }

  updateSafeBounds() {
    if (!this._initalized) {
      return
    }

    const { top, right, bottom, left } = this.sliceConfig.safeOffsets
    const newX = this.x + left
    const newY = this.y + top
    const newW = this.width - (left + right)
    const newH = this.height - (top + bottom)

    const { x, y, width, height } = this._safeBounds
    if (newX !== x || newY !== y || newW !== width || newH !== height) {
      this._safeBounds.setTo(
        this.x + left, this.y + top,
        this.width - (left + right), this.height - (top + bottom)
      )
      this.events.emit(EVENTS.UPDATE_SAFE_BOUNDS, this, this._safeBounds)
    }
    if (this._g) {
      this._g.lineStyle(1, 0x00ff00)
      this._g.strokeRectShape(this._safeBounds)
    }
  }

  get y() { return this._y }
  set y(y) {
    if (this._y !== y) {
      if (this._g) {
        this._g.clear()
        this.drawFrames()
      }
      this._y = y
      this.updateSafeBounds()
    }
  }

  get x() { return this._x }
  set x (x){
    if (this._x !== x) {
      if (this._g) {
        this._g.clear()
        this.drawFrames()
      }
      this._x = x
      this.updateSafeBounds()
    }
  }

  resize(_w, _h) {
    const { minSizing } = this.sliceConfig || {}
    const h = minSizing ? Math.max(minSizing.height, _h) : _h
    const w = minSizing ? Math.max(minSizing.width, _w): _w

    if (h > _h || w > _w) {
      const err =
        `Attempted to set NineSlice size less than minimum (${_w}x${_h}).`
      // eslint-disable-next-line no-console
      console.error(err)
    }

    super.resize(w, h)
    if (!this._initalized) {
      return
    }

    if (this._g) {
      this._g.clear()
    }
    this.drawFrames()
    this.updateSafeBounds()
  }

  initFrames() {
    const tex = this.sourceTex
    const texW = this.sourceFrame.width
    const texH = this.sourceFrame.height
    const texX = this.sourceFrame.cutX
    const texY = this.sourceFrame.cutY

    const addFrame = (_name, x, y, w, h) => {
      const name = this.mkFrameName(_name)
      if (!tex.has(name)) {
        this._frameCache[_name] = tex.add(name, 0, texX + x, texY + y, w, h)
      } else {
        this._frameCache[_name] = tex.frames[name]
      }
    }

    const sl = shortSliceLayout(this.sliceConfig.sourceLayout)

    addFrame('topLeft', 0, 0, sl.tl.x, sl.tl.y)
    addFrame('topRight', texW - sl.tr.x, 0, sl.tr.x, sl.tr.y)
    addFrame('bottomRight', texW - sl.br.x, texH - sl.br.y, sl.br.x, sl.br.y)
    addFrame('bottomLeft', 0, texH - sl.bl.y, sl.bl.x, sl.bl.y)

    addFrame('topMiddle',
      sl.tl.x, 0,
      texW - (sl.tl.x + sl.tr.x), Math.max(sl.tl.y, sl.tr.y))

    addFrame('bottomMiddle',
      sl.bl.x, texH - Math.max(sl.bl.y, sl.br.y),
      texW - (sl.bl.x + sl.br.x), Math.max(sl.bl.y, sl.br.y))

    addFrame('leftMiddle',
      0, sl.tl.y,
      Math.max(sl.tl.x, sl.bl.x), texH - (sl.tl.y + sl.bl.y))

    addFrame('rightMiddle',
      texW - Math.max(sl.tr.x, sl.br.x), sl.tr.y,
      Math.max(sl.tr.x, sl.br.x), texH - sl.tr.y - sl.br.y)

    const cLeftX = Math.min(sl.tl.x, sl.bl.x)
    const cTopY = Math.min(sl.tl.y, sl.tr.y)
    addFrame('center',
      cLeftX, cTopY,
      texW - cLeftX - Math.min(sl.tr.x, sl.br.x), texH - cTopY - Math.min(sl.br.y, sl.bl.y))
  }

  getUsableBounds() {
    if (!this._initalized) {
      return null
    }

    return this._safeBounds
  }

  drawFrames() {
    if (!this._initalized) {
      return
    }

    if (this._g) {
      this._g.lineStyle(1, 0xff0000)
    }

    const sl = shortSliceLayout(this.sliceConfig.sourceLayout)
    const frame = this._frameCache

    const draw = (curFrame, x, y, wantWidth, wantHeight) => {
      if (wantWidth > 0 && wantHeight > 0) {
        if (this._g) {
          this._g.strokeRect(this.x + x, this.y + y, wantWidth, wantHeight)
        }

        const frameImage = this.scene.make.image({
          key: this.sourceTex.key,
          frame: curFrame.name,
          x: 0,
          y: 0,
        })

        const scaleX = wantWidth / curFrame.width
        const scaleY = wantHeight / curFrame.height

        frameImage
          .setOrigin(0)
          .setScale(scaleX, scaleY)

        this.draw(frameImage, x, y)
        frameImage.destroy()
      }
    }

    const minLeftX = Math.min(sl.tl.x, sl.bl.x)
    const minRightX = Math.min(sl.tr.x, sl.br.x)

    const minTopY = Math.min(sl.tl.y, sl.tr.y)
    const minBottomY = Math.min(sl.bl.y, sl.br.y)

    this.clear()

    // first draw everything that needs to be scaled; this is more complicated
    // than necessary because some fool (me) thought it was a good idea to
    // support unique offsets per corner. 🤦
    draw(frame.center,
      minLeftX, minTopY,
      this.width - minLeftX - minRightX, this.height - minTopY - minBottomY)
    draw(frame.topMiddle,
      sl.tl.x, 0,
      this.width - sl.tl.x - sl.tr.x, frame.topMiddle.height)
    draw(frame.bottomMiddle,
      sl.bl.x, this.height - frame.bottomMiddle.height,
      this.width - sl.bl.x - sl.br.x, frame.bottomMiddle.height)
    draw(frame.leftMiddle, 0, sl.tl.y, frame.leftMiddle.width, this.height - sl.tl.y - sl.bl.y)
    draw(frame.rightMiddle,
      this.width - sl.tr.x, sl.tr.y,
      frame.rightMiddle.width, this.height - sl.tr.y - sl.br.y)

    // everything else since it's important that they draw atop other edges
    draw(frame.topLeft, 0, 0, sl.tl.x, sl.tl.y)
    draw(frame.topRight, this.width - sl.tr.x, 0, sl.tr.x, sl.tr.y)
    draw(frame.bottomRight, this.width - sl.br.x, this.height - sl.br.y, sl.br.x, sl.br.y)
    draw(frame.bottomLeft, 0, this.height - sl.bl.y, sl.bl.x, sl.bl.y)
  }

  enableDebugDraw(enabled = true) {
    if (this._g) {
      this._g.clear()
    }

    if (enabled) {
      this._g = this.scene.add.graphics(this.x, this.y)
    } else {
      this._g = null
    }
    this.drawFrames()
    this.updateSafeBounds()
  }
}