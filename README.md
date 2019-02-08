# Phaser3 9-slice Plugin

> This is built for Phaser v3 and was inspired by the fantastic v2/CE version
contributed by [AleBles][AleBles]. Find it at [@orange-games/phaser-nineslice][orange].

[AleBles]: https://github.com/AleBles
[orange]: https://github.com/orange-games/phaser-nineslice


## What is 9-slice scaling?

**tl;dr:** See a [demo][demo-url]!

9-slice scaling is a technique to deform a 2D texture allowing it to be scaled
without deforming the corners.  Usually this is done to retain the shape or
embelishments on the corners. Wikipedia has a [good description][wiki]. But it's
pretty easy to show an example:

![9-slice scaling example](./README/9slice-demo.gif)

[wiki]: https://en.wikipedia.org/wiki/9-slice_scaling
[demo-url]: https://jdotrjs.github.io/phaser3-nineslice/

## Requirements

- phaser3-nineslice version >= 0.4.0 require Phaser >= 3.12.
- phaser3-nineslice versions 0.3.x require Phaser >= 3.10.

## Getting the plugin: Directly including it.

Include [`nineslice.js`](./dist/nineslice.js) in your project:

```html
<script
  type="text/javascript"
  src="https://github.com/jdotrjs/phaser3-nineslice/releases/download/v0.5.0/nineslice.min.js"
></script>
```

I used this method in the demo. The [source is included](./example) in this
repository.

## Getting the plugin: `npm` and `yarn`

[![npm](https://img.shields.io/npm/dt/phaser3-nineslice.svg)](https://www.npmjs.com/package/phaser3-nineslice)

This is published under [phaser3-nineslice][npmjs] add can be added to your
project via:

```bash
# npm:
npm install phaser3-nineslice --save

# yarn:
yarn add phaser3-nineslice
```

[npmjs]: https://www.npmjs.com/package/phaser3-nineslice/

## Usage

Once you've included the plugin through one of the methods above there are two
final steps to make use of it in your project:

### 1. Enable the Plugin in your `Game` config:

```javascript
// Assuming you use use ES6 imports...
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import { Scene1 } from './scene'

let phaserConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-display',
  backgroundColor: '0x9a9a9a',
  width: 800,
  height: 600,
  plugins: {
    global: [ NineSlicePlugin.DefaultCfg ],
  },
  scene: [ Scene1 ],
}

new Phaser.Game(phaserConfig)
```

You likely won't need to mess with it but, internally, `DefaultCfg` is
defined as `{ key: 'NineSlice', plugin: NineSlicePlugin, start: true }` but any key
can be used if you need to change it.

### 2. Use the plugin to make 9-sliced objects!

The easiest way to construct a new sliced object is to use the new
`GameObjectFactory` method (`this.add.nineslice`) or new `GameObjectCreator`
method (`this.make.nineslice`).

```javascript
  create() {
    this.dlg = this.add.nineslice(
      110, 110,   // this is the starting x/y location
      340, 240,   // the width and height of your object
      'dlgLarge', // a key to an already loaded image
      88,         // the width and height to offset for a corner slice
      24          // (optional) pixels to offset when computing the safe usage area
    )

    // ... additional scene creation code
  }
```

Examining the resulting object added to your scene we can observe how the numbers
above are used.

![9-slice layout](./README/layout.png)

The red lines are the slices that have been created out of the underlying
texture. The green rectangle is an area called the "safe usable area" which
represents the space that can be used to house content within this 9-slice
object. It's available as a `Phaser.Geom.Retangle` via `.getUsableBounds`
method on the 9 slice object. Whenever the object changes x/y position or
is resized an event `NineSlice.EVENT.UPDATE_SAFE_BOUNDS` is emitted;
[code ref][emitref].

[emitref]: ./src/NineSlice.js#L133

**Spritesheets and Texture Atlases**

The fifth paramater is used to specify the texture and can be provided as a
string to use a loaded texture or an object with the structure

```javascript
{
  key: string,
  frame: string | number,
}
```

if you would like to specify a frame within a spritesheet or atlas indicated
by `key`.

**Non-uniform corner slices**

If your texture doesn't have uniform corners you can define the width and height
offsets of each independently using a slightly more complicated format. The same
true for the safe usage area.

```javascript
this.dlg = this.add.nineslice(
  110, 110, 340, 240, 'kenny',
  [35, 15, 15, 15],
)
```

This results in the following texture slicing:

![9slice with non-uniform corner sizes](./README/layout-2.png)

When an array is used it can be 1 to 4 elements and the values are assigned the
same way as when defining border offsets in CSS.

Array Length  | Use  | Explanation |
------------- | ---- | ----------- |
1 | `[ topRightBottomLeft ]` | The first (only) element is used as the value for all four sides
2 | `[ topBottom, leftRight ]` | The first element is used for the top and bottom, the second element is used as the for the left and right
3 | `[ top, rightLeft, bottom ]` | The first element is used for the top, second is used for the right and left, and the third element is used for the bottom
4 | `[ top, right, bottom, left ]` | Each element is assigned to a specific side

In addition to switching to an array to define the pixel offsets for the corners
our example also left out the safe area usage. In this case will be derived from
the four corner offsets as seen above by the green area. If an array is used
instead of a number it is expanded in the same way as

**Resizing your 9 Slice**

Directly setting the `.width` and `.height` attributes will cause scaling issues
([#1][iss1]). If you wish to change the object's size you should use `.resize`:

```javascript
  this.dlg = this.add.nineslice(
    110, 110, 340, 240, 'kenny',
    [35, 15, 15, 15],
  )
  // ...
  this.dlg.resize(400, 400)
```

If the call to resize would result in the safe area having an area of less than
0 or the corners to overlap then it will only reduce its size to that point.

[iss1]: https://github.com/jdotrjs/phaser3-nineslice/issues/1

**Direct Configuration**

In addition to the factory/creator methods you can construct a NineSlice directly:

```javascript
this.dlg = new NineSlice.NineSlice(
  scene,          // the parent scene of this objects
  sliceConfig,    // configures the source texture and layout of slice relative to it
  positionConfig, // specifies location and dimensions of the constructed object
)
```

For details about the structure of the config objects referenced above see
`NineSliceConfig` and `PositionConfig` in [`types.js`](./src/types.js).

They may also be passed to `.add` and `.make`:

```javascript
this.make.nineslice(sliceConfig, positionConfig)
```

**Summary**

Valid arguments to `.add.nineslice` and `.make.nineslice` are:

```
Arguments =
  | (NineSliceConfig, PositionConfig)
  | (x: number,
     y: number,
     w: number,
     h: number,
     source: FrameSelection,
     corner: OffsetConfig,
     safeArea: OffsetConfig | null)

FrameSelection =
  | key: string
  | {
      key: string,
      frame: number | string,
    }

OffsetConfig =
  | number
  | [topRightBottomLeft: number]
  | [topBottom: number, rightLeft: number],
  | [top: number, rightLeft: number, bottom: number],
  | [top: number, right: number, bottom: number, left: number]
```
