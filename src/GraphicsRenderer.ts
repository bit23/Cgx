
namespace Cgx {

    export interface GraphicsRendererSupport {
        [name: string]: boolean;
    }

    export type RendererBrush = string | CanvasGradient | CanvasPattern;

    export abstract class GraphicsRenderer {

        public static readonly support: GraphicsRendererSupport = (() => {
            return {
                // TODO
            };
        })();

        public static readonly defaultValues = {
            get globalAlpha() { return 1.0; },
            get globalCompositeOperation() { return "source-over"; },
            get fillStyle() { return "#000"; },
            get strokeStyle() { return "#000"; },
            get shadowBlur() { return 0; },
            get shadowColor() { return "#000"; },
            get shadowOffsetX() { return 0; },
            get shadowOffsetY() { return 0; },
            get lineCap() { return <CanvasLineCap>"butt"; },
            get lineJoin() { return <CanvasLineJoin>"miter"; },
            get lineWidth() { return 1.0; },
            get miterLimit() { return 10.0; },
            get lineDashOffset() { return 0; },
            get textLineHeight() { return "1.5em"; },
            get fontStyle() { return "normal"; },
            get fontWeight() { return "normal"; },
            get fontSize() { return "16px"; },
            get fontFamily() { return "sans-serif"; },
            get textAlign() { return <CanvasTextAlign>"left"; },
            get textBaseline() { return <CanvasTextBaseline>"bottom"; },
            get direction() { return <CanvasDirection>"inherit"; },
            get imageSmoothingEnabled() { return true; }
        };


        constructor(canvas: CanvasSurface) {
            this.canvas = canvas;
        }

        public abstract readonly name: string;

        public readonly canvas: CanvasSurface;



        // compositing

        public abstract globalAlpha: number;

        public abstract globalCompositeOperation: string;


        // colors, styles, shadows

        public abstract fillStyle: RendererBrush;

        public abstract strokeStyle: RendererBrush;

        public abstract shadowBlur: number;

        public abstract shadowColor: string;

        public abstract shadowOffsetX: number;

        public abstract shadowOffsetY: number;


        // gradients, pattern

        public abstract createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;

        public abstract createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;

        public abstract createPattern(image: CanvasImageSource, repetition: string): CanvasPattern;


        // line style

        public abstract lineCap: CanvasLineCap;

        public abstract lineJoin: CanvasLineJoin;

        public abstract lineWidth: number;

        public abstract miterLimit: number;

        public abstract lineDashOffset: number;

        public abstract getLineDash(): number[];

        public abstract setLineDash(segments: Iterable<number>): void;


        // text style

        public abstract textLineHeight: string;

        public abstract fontWeight: string;

        public abstract fontStyle: string;

        public abstract fontSize: string;

        public abstract fontFamily: string;

        public abstract textAlign: CanvasTextAlign;

        public abstract textBaseline: CanvasTextBaseline;

        public abstract direction: CanvasDirection;


        // context, canvas

        public abstract saveState(): void;

        public abstract restoreState(): void;

        public abstract toDataURL(type?: string, quality?: any): string;


        // clear, stroke, fill, clip

        public abstract clearRect(x: number, y: number, width: number, height: number, fillStyle?: RendererBrush): void;

        public abstract strokeRect(x: number, y: number, width: number, height: number): void;

        public abstract fillRect(x: number, y: number, width: number, height: number): void;

        public abstract stroke(): void;

        public abstract fill(fillRule?: CanvasFillRule): void;

        public abstract strokePath2D(path2D: Path2D): void;

        public abstract fillPath2D(path2D: Path2D, fillRule?: CanvasFillRule): void;

        public abstract clip(): void;


        // shapes

        public abstract rect(x: number, y: number, width: number, height: number): void;

        public abstract square(x: number, y: number, size: number): void;

        public abstract ellipse(x: number, y: number, rx: number, ry: number, rotation?: number, startAngle?: number, endAngle?: number): void;

        public abstract circle(x: number, y: number, r: number): void;

        public abstract arc(x: number, y: number, r: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;


        // path

        public abstract beginPath(): void;

        public abstract closePath(): void;

        public abstract arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

        public abstract moveTo(x: number, y: number): void;

        public abstract lineTo(x: number, y: number): void;

        public abstract bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void;

        public abstract quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;


        // hit testing

        public abstract isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;

        public abstract isPointInPath2D(path2D: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;

        public abstract isPointInStroke(x: number, y: number): boolean;

        public abstract isPointInPath2DStroke(path2D: Path2D, x: number, y: number): boolean;

        public abstract addHitRegion(options?: any): void;

        public abstract removeHitRegion(id: string): void;

        public abstract clearHitRegions(): void;


        // image, imageData

        public abstract drawImage(img: CanvasImageSource, dx: number, dy: number, dw?: number, dh?: number, sx?: number, sy?: number, sw?: number, sh?: number): void;

        public abstract createImageData(width: number, height: number): ImageData;

        public abstract cloneImageData(imageData: ImageData): ImageData;

        public abstract getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;

        public abstract putImageData(imageData: ImageData, x: number, y: number): void;

        public abstract imageSmoothingEnabled: boolean;


        // text

        public abstract fillText(text: string, x: number, y: number, maxWidth?: number): void;

        public abstract strokeText(text: string, x: number, y: number, maxWidth?: number): void;

        public abstract measureText(text: string): TextMetrics;


        // transformations

        public abstract rotate(angle: number): void;

        public abstract translate(dx: number, dy: number): void;

        public abstract scale(x: number, y: number): void;

        public abstract transform(a: number, b: number, c: number, d: number, e: number, f: number): void;

        public abstract setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;

        public abstract resetTransform(): void;


        // misc

        public abstract drawFocusIfNeeded(element: Element): void;
    }
}