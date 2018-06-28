const Name = 'scene1'

class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: Name })
  }

  preload() {
    this.load.image('kenny', './assets/kennyBlue.png')
  }

  create() {
    this.startX = 50
    this.startY = 70
    this.stopX = 450
    this.stopY = 270
    const width = this.stopX - this.startX
    const height = this.stopY - this.startY

    this.dlg = this.add.nineslice(
      this.startX,
      this.startY,
      width,
      height,
      'kenny',
      [35, 15, 15]
    )

    this.mode = 0
    this.txt = this.add.text(10, 10)
    this.input.on('pointerdown', () => {
      this.mode++
      if (this.mode === 6) {
        this.mode = 0
      }
    })

    this.input.on('pointermove', (pointer) => {
      if (this.mode === 0 || this.mode === 2 || this.mode === 4) {
        return
      }

      if (this.mode === 5) {
        const { x, y } = pointer
        this.dlg.x = x
        this.dlg.y = y
        this.startX = x
        this.startY = y
        this.stopX = x + this.dlg.width
        this.stopY = y + this.dlg.height
        return
      }

      if (this.mode === 1) {
        this.startX = pointer.x
        this.startY = pointer.y
      }

      if (this.mode === 3) {
        this.stopX = pointer.x
        this.stopY = pointer.y
      }

      this.dlg.setPosition(this.startX, this.startY)
      let newWidth = this.stopX - this.startX
      let newHeight = this.stopY - this.startY
      this.dlg.resize(newWidth, newHeight)
    })

    this.highlight = this.add.graphics()
    this.highlight.lineStyle(2, 0xff0000)

    this.dlg.events.on(NineSlice.EVENTS.UPDATE_SAFE_BOUNDS, (_, bb) => {
      console.log(bb)
    })

    this.dlg.enableDebugDraw()
    this.debugEnabled = true
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.debugEnabled = !this.debugEnabled
      this.dlg.enableDebugDraw(this.debugEnabled)
    }

    this.txt.setText(`Mode: ${modeName[this.mode] || ''}`)
    this.highlight.clear()
    if (this.mode === 1) {
      this.highlight.strokeCircle(this.startX, this.startY, 7)
    }
    if (this.mode === 3) {
      this.highlight.strokeCircle(this.stopX, this.stopY, 7)
    }

    if (this.debugEnabled) {
      this.highlight.fillStyle(0x00ff00)
      this.highlight.fillPoint(this.startX, this.startY, 3)
      this.highlight.fillStyle(0x0000ff)
      this.highlight.fillPoint(this.stopX, this.stopY, 3)
    }

  }
}

const modeName = {
  1: 'Adjust Top-Left',
  3: 'Adjust Bottom-Right',
  5: 'Move Dialog',
}

Scene1.Name = Name