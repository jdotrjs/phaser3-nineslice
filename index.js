let phaserConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-display',
  backgroundColor: '0x9a9a9a',
  width: 800,
  height: 600,
  plugins: {
    global: [ NineSlice.Plugin.DefaultCfg ],
  },
  scene: [ Scene1 ],
}

new Phaser.Game(phaserConfig)