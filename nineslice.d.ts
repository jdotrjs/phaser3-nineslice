declare module 'phaser3-nineslice' {
    export interface NineSliceConfig {
        sourceKey: string,
        sourceFrame?: string | number,
        sourceLayout: LayoutConfig | CornerConfig,
        safeOffsets?: UsableSpaceOffsets,
        minSizing?: MinSizeConfig | false,
    }

    export interface PositionConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    }

    export interface LayoutConfig {
        topLeft: CornerConfig,
        topRight?: CornerConfig,
        bottomLeft?: CornerConfig,
        bottomRight?: CornerConfig,
    }

    export interface CornerConfig {
        width: number,
        height?: number,
    }

    export interface UsableSpaceOffsets {
        top: number,
        right: number,
        bottom: number,
        left: number,
    }

    export interface MinSizeConfig {
        width: number,
        height: number,
    }

    export class Plugin extends Phaser.Plugins.BasePlugin {

        static DefaultCfg: {
            key: string,
            plugin: Plugin,
            start: boolean
        }
    }

    export class NineSlice extends Phaser.GameObjects.RenderTexture {
        constructor(scene: Phaser.Scene, config: NineSliceConfig, position: PositionConfig);
    }
}

declare namespace Phaser.GameObjects {
    // TODO: .add.nineslice return type
    interface GameObjectFactory {
        /**
         * The easiest way to construct a new sliced object is to use the new
         * `GameObjectFactory` method (`this.add.nineslice`) or new `GameObjectCreator`
         * method (`this.make.nineslice`).
         * ```js
         *   create() {
         *     this.dlg = this.add.nineslice(
         *       110, 110,   // this is the starting x/y location
         *       340, 240,   // the width and height of your object
         *       'dlgLarge', // a key to an already loaded image
         *       88,         // the width and height to offset for a corner slice
         *       24          // (optional) pixels to offset when computing the safe usage area
         *     )
         * 
         *    // ... additional scene creation code
         *   }
         * ```
         * 
         * The fifth paramater is used to specify the texture and can be provided as a
         * string to use a loaded texture or an object with the structure
         * 
         * ```javascript
         * {
         *   key: string,
         *   frame: string | number,
         * }
         * ```
         * 
         * if you would like to specify a frame within a spritesheet or atlas indicated 
         * by `key`.
         */
        nineslice(x: number, y: number, width: number, height: number, key: string,
            offset: number, safeArea?: number): Phaser.GameObjects.RenderTexture;

        /**
         * If your texture doesn't have uniform corners you can define the width and height 
         * offsets of each independently using a slightly more complicated format. The same 
         * true for the safe usage area.
         * ```js
         * this.dlg = this.add.nineslice(
         *   110, 110, 340, 240, 'kenny',
         *   [35, 15, 15, 15],
         * )
         * ```
         * When an array is used it can be 1 to 4 elements and the values are assigned the 
         * same way as when defining border offsets in CSS.
         * 
         * Array Length  | Use  | Explanation |
         * ------------- | ---- | ----------- |
         * 1 | `[ topRightBottomLeft ]` | The first (only) element is used as the value for all four sides
         * 2 | `[ topBottom, leftRight ]` | The first element is used for the top and bottom, the second element is used as the for the left and right
         * 3 | `[ top, rightLeft, bottom ]` | The first element is used for the top, second is used for the right and left, and the third element is used for the bottom
         * 4 | `[ top, right, bottom, left ]` | Each element is assigned to a specific side
         * 
         * In addition to switching to an array to define the pixel offsets for the corners
         * our example also left out the safe area usage. In this case will be derived from
         * the four corner offsets as seen above by the green area. If an array is used
         * instead of a number it is expanded in the same way as
         */
        nineslice(x: number, y: number, width: number, height: number, key: string,
            nonUniform: number[]): Phaser.GameObjects.RenderTexture;
    }

    // TODO: .make.nineslice return type & argument types
    interface GameObjectCreator {
        /**
         * Use this to directly construct a nine slice.
         */
        nineslice(config: any, position: any): Phaser.GameObjects.RenderTexture;
    }
}
