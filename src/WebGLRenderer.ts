
namespace Cgx {

    export interface WebGLRendererSupport extends GraphicsRendererSupport {
        // TODO
    }

    export class WebGLRenderer extends GraphicsRenderer {

        public static readonly support: WebGLRendererSupport = (() => {
            return {
                // TODO
            };
        })();

        private _context: WebGLRenderingContext;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this._context = canvas.getContext("webgl");
            this.setDefaultValues();
        }

        private setDefaultValues() {
            this.globalAlpha = GraphicsRenderer.defaultValues.globalAlpha;
            this.globalCompositeOperation = GraphicsRenderer.defaultValues.globalCompositeOperation;
            this.fillStyle = GraphicsRenderer.defaultValues.fillStyle;
            this.strokeStyle = GraphicsRenderer.defaultValues.strokeStyle;
            this.shadowBlur = GraphicsRenderer.defaultValues.shadowBlur;
            this.shadowColor = GraphicsRenderer.defaultValues.shadowColor;
            this.shadowOffsetX = GraphicsRenderer.defaultValues.shadowOffsetX;
            this.shadowOffsetY = GraphicsRenderer.defaultValues.shadowOffsetY;
            this.lineCap = GraphicsRenderer.defaultValues.lineCap;
            this.lineJoin = GraphicsRenderer.defaultValues.lineJoin;
            this.lineWidth = GraphicsRenderer.defaultValues.lineWidth;
            this.miterLimit = GraphicsRenderer.defaultValues.miterLimit;
            this.lineDashOffset = GraphicsRenderer.defaultValues.lineDashOffset;
            this.textLineHeight = GraphicsRenderer.defaultValues.textLineHeight;
            this.fontStyle = GraphicsRenderer.defaultValues.fontStyle;
            this.fontWeight = GraphicsRenderer.defaultValues.fontWeight;
            this.fontSize = GraphicsRenderer.defaultValues.fontSize;
            this.fontFamily = GraphicsRenderer.defaultValues.fontFamily;
            this.textAlign = GraphicsRenderer.defaultValues.textAlign;
            this.textBaseline = GraphicsRenderer.defaultValues.textBaseline;
            this.direction = GraphicsRenderer.defaultValues.direction;
            this.imageSmoothingEnabled = GraphicsRenderer.defaultValues.imageSmoothingEnabled;
        }

        public readonly name = "WebGLRenderer";

        public globalAlpha: number;
        public globalCompositeOperation: string;
        public fillStyle: RendererBrush;
        public strokeStyle: RendererBrush;
        public shadowBlur: number;
        public shadowColor: string;
        public shadowOffsetX: number;
        public shadowOffsetY: number;
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient {
            throw new Error("Method not implemented.");
        }
        public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient {
            throw new Error("Method not implemented.");
        }
        public createPattern(image: CanvasImageSource, repetition: string): CanvasPattern {
            throw new Error("Method not implemented.");
        }
        public lineCap: CanvasLineCap;
        public lineJoin: CanvasLineJoin;
        public lineWidth: number;
        public miterLimit: number;
        public lineDashOffset: number;
        public getLineDash(): number[] {
            throw new Error("Method not implemented.");
        }
        public setLineDash(segments: Iterable<number>): void {
            throw new Error("Method not implemented.");
        }
        public textLineHeight: string;
        public fontStyle: string;
        public fontWeight: string;
        public fontSize: string;
        public fontFamily: string;
        public textAlign: CanvasTextAlign;
        public textBaseline: CanvasTextBaseline;
        public direction: CanvasDirection;
        public saveState(): void {
            throw new Error("Method not implemented.");
        }
        public restoreState(): void {
            throw new Error("Method not implemented.");
        }
        public toDataURL(type?: string, quality?: any): string {
            throw new Error("Method not implemented.");
        }
        public clearRect(x: number, y: number, width: number, height: number, fillStyle?: RendererBrush): void {
            throw new Error("Method not implemented.");
        }
        public strokeRect(x: number, y: number, width: number, height: number): void {
            throw new Error("Method not implemented.");
        }
        public fillRect(x: number, y: number, width: number, height: number): void {
            throw new Error("Method not implemented.");
        }
        public stroke(): void {
            throw new Error("Method not implemented.");
        }
        public fill(fillRule?: CanvasFillRule): void {
            throw new Error("Method not implemented.");
        }
        public strokePath2D(path2D: Path2D): void {
            throw new Error("Method not implemented.");
        }
        public fillPath2D(path2D: Path2D, fillRule?: CanvasFillRule): void {
            throw new Error("Method not implemented.");
        }
        public clip(): void {
            throw new Error("Method not implemented.");
        }
        public rect(x: number, y: number, width: number, height: number): void {
            throw new Error("Method not implemented.");
        }
        public square(x: number, y: number, size: number): void {
            throw new Error("Method not implemented.");
        }
        public ellipse(x: number, y: number, rx: number, ry: number, rotation?: number, startAngle?: number, endAngle?: number): void {
            throw new Error("Method not implemented.");
        }
        public circle(x: number, y: number, r: number): void {
            throw new Error("Method not implemented.");
        }
        public arc(x: number, y: number, r: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void {
            throw new Error("Method not implemented.");
        }
        public beginPath(): void {
            throw new Error("Method not implemented.");
        }
        public closePath(): void {
            throw new Error("Method not implemented.");
        }
        public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
            throw new Error("Method not implemented.");
        }
        public moveTo(x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public lineTo(x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public quadraticCurveTo(cx: number, cy: number, x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean {
            throw new Error("Method not implemented.");
        }
        public isPointInPath2D(path2D: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean {
            throw new Error("Method not implemented.");
        }
        public isPointInStroke(x: number, y: number): boolean {
            throw new Error("Method not implemented.");
        }
        public isPointInPath2DStroke(path2D: Path2D, x: number, y: number): boolean {
            throw new Error("Method not implemented.");
        }
        public addHitRegion(options?: any): void {
            throw new Error("Method not implemented.");
        }
        public removeHitRegion(id: string): void {
            throw new Error("Method not implemented.");
        }
        public clearHitRegions(): void {
            throw new Error("Method not implemented.");
        }
        public drawImage(img: CanvasImageSource, dx: number, dy: number, dw?: number, dh?: number, sx?: number, sy?: number, sw?: number, sh?: number): void {
            throw new Error("Method not implemented.");
        }
        public createImageData(width: number, height: number): ImageData {
            throw new Error("Method not implemented.");
        }
        public cloneImageData(imageData: ImageData): ImageData {
            throw new Error("Method not implemented.");
        }
        public getImageData(sx: number, sy: number, sw: number, sh: number): ImageData {
            throw new Error("Method not implemented.");
        }
        public putImageData(imageData: ImageData, x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public imageSmoothingEnabled: boolean;
        public fillText(text: string, x: number, y: number, maxWidth?: number): void {
            throw new Error("Method not implemented.");
        }
        public strokeText(text: string, x: number, y: number, maxWidth?: number): void {
            throw new Error("Method not implemented.");
        }
        public measureText(text: string): TextMetrics {
            throw new Error("Method not implemented.");
        }
        public rotate(angle: number): void {
            throw new Error("Method not implemented.");
        }
        public translate(dx: number, dy: number): void {
            throw new Error("Method not implemented.");
        }
        public scale(x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public transform(a: number, b: number, c: number, d: number, e: number, f: number): void {
            throw new Error("Method not implemented.");
        }
        public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void {
            throw new Error("Method not implemented.");
        }
        public resetTransform(): void {
            throw new Error("Method not implemented.");
        }
        public drawFocusIfNeeded(element: Element): void {
            throw new Error("Method not implemented.");
        }


    }
}