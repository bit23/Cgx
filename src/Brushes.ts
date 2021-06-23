
namespace Cgx {

    export type BrushType = "linear" | "radial" | "pattern";

    export abstract class Brush {
        public readonly abstract brushType: BrushType;
    }

    export abstract class GradientBrush extends Brush {
        protected _colorStops: Array<{ offset: number, color: string }> = [];
        public addColorStop(offset: number, color: string) {
            this._colorStops.push({ offset, color });
        }
        public getColorStops() {
            return this._colorStops.slice(0);
        }
    }

    export class LinearGradientBrush extends GradientBrush {
        public readonly brushType: BrushType = "linear";
        public x0 = 0;
        public y0 = 0;
        public x1 = 100;
        public y1 = 100;
    }

    export class RadialGradientBrush extends GradientBrush {
        public readonly brushType: BrushType = "radial";
        public x0 = 0;
        public y0 = 0;
        public r0 = 0;
        public x1 = 100;
        public y1 = 100;
        public r1 = 0;
    }

    export class PatternBrush extends Brush {
        public readonly brushType: BrushType = "pattern";
        public image: HTMLImageElement = null;
        public repetition = "repeat";
    }
}