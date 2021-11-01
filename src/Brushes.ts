
namespace Cgx {

    export type BrushType = "linear" | "radial" | "pattern";

    export abstract class Brush {
        public readonly abstract brushType: BrushType;
        public abstract clone() : Brush;
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

        public clone() {
            const result = new LinearGradientBrush();
            result._colorStops = this._colorStops.slice(0);
            result.x0 = this.x0;
            result.y0 = this.y0;
            result.x1 = this.x1;
            result.y1 = this.y1;
            return result;
        }
    }

    export class RadialGradientBrush extends GradientBrush {
        public readonly brushType: BrushType = "radial";
        public x0 = 0;
        public y0 = 0;
        public r0 = 0;
        public x1 = 100;
        public y1 = 100;
        public r1 = 0;

        public clone() {
            const result = new RadialGradientBrush();
            result._colorStops = this._colorStops.slice(0);
            result.x0 = this.x0;
            result.y0 = this.y0;
            result.r0 = this.r0;
            result.x1 = this.x1;
            result.y1 = this.y1;
            result.r1 = this.r1;
            return result;
        }
    }

    export class PatternBrush extends Brush {
        public readonly brushType: BrushType = "pattern";
        public image: HTMLImageElement = null;
        public repetition = "repeat";

        public clone() {
            const result = new PatternBrush();
            result.image = this.image.cloneNode() as HTMLImageElement;
            result.repetition = this.repetition;
            return result;
        }
    }
}