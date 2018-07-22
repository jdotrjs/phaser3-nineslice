import Phaser from 'phaser'
import NineSlice from './NineSlice'
import processOffsetsArray from './processOffsetsArray'

export default class Plugin extends Phaser.Plugins.BasePlugin {
  constructor(mgr) {
    super(mgr)
    mgr.registerGameObject('nineslice', this.addNineSlice, this.makeNineSlice)
  }

  addNineSlice(...args) {
    const slice = mkNineSlice(this.scene, args)
    this.displayList.add(slice)
    return slice
  }

  makeNineSlice(...args) {
    return mkNineSlice(this.scene, args)
  }
}

const mkNineSlice = (scene, args) => {
  if (args.length === 2) {
    return new NineSlice(scene, args[0], args[1])
  }

  if (args.length < 6) {
    throw new Error(
      `Expected at least 6 arguments to NineSlice creator, received ${args.length}.`
    )
  }
  if (args.length > 7) {
    // eslint-disable-next-line no-console
    console.error(
      `Expected less than 7 arguments for NineSlice creation, received ${args.length}.`
    )
  }

  const [x, y, width, height, keyCfg, offsetCfg] = args

  const sliceConfig = {}
  const placement = { x, y, width, height }

  // extract the key and (optional) frame for the texture source
  if (typeof keyCfg === 'string') {
    sliceConfig.sourceKey = keyCfg
  } else {
    const { key, frame } = keyCfg
    sliceConfig.sourceKey = key
    if (typeof frame === 'string' || typeof frame === 'number') {
      sliceConfig.sourceFrame = keyCfg.frame
    }
  }

  // extract the layout config
  if (typeof offsetCfg === 'number') {
    // it's a uniform offset for all corners
    sliceConfig.sourceLayout = { width: offsetCfg, height: offsetCfg }
  } else if (Array.isArray(offsetCfg)) {
    const [top, right, bottom, left] = processOffsetsArray(offsetCfg)
    sliceConfig.sourceLayout = {
      topLeft: { width: left, height: top },
      topRight: { width: right, height: top },
      bottomRight: { width: right, height: bottom },
      bottomLeft: { width: left, height: bottom },
    }
  } else {
    // assume that we're dealing with { width, height }
    sliceConfig.sourceLayout = offsetCfg
  }

  if (args.length > 6) {
    if (typeof args[6] === 'number') {
      const n = args[6]
      sliceConfig.safeOffsets = { top: n, right: n, bottom: n, left: n }
    } else if (Array.isArray(args[6])) {
      const [top, right, bottom, left] = processOffsetsArray(args[6])
      sliceConfig.safeOffsets = { top, right, bottom, left }
    } else {
      throw new Error(`Expected argument number or array for argument 7, got ${typeof args[6]}.`)
    }
  }

  return new NineSlice(scene, sliceConfig, placement)
}

const DefaultCfg = {
  key: 'NineSlice',
  plugin: Plugin,
  start: true,
}

Plugin.DefaultCfg = DefaultCfg