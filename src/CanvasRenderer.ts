
/// <reference path="GraphicsRenderer.ts" />

namespace Cgx {

    export interface CanvasRendererSupport extends GraphicsRendererSupport {
        readonly ellipseDrawing: boolean;
        readonly addHitRegion: boolean;
        readonly removeHitRegion: boolean;
        readonly clearHitRegion: boolean;
    }

    export class CanvasRenderer extends GraphicsRenderer {

        public static readonly support: CanvasRendererSupport = (() => {
            return {
                ellipseDrawing: "ellipse" in CanvasRenderingContext2D.prototype,
                addHitRegion: "addHitRegion" in CanvasRenderingContext2D.prototype,
                removeHitRegion: "removeHitRegion" in CanvasRenderingContext2D.prototype,
                clearHitRegion: "clearHitRegions" in CanvasRenderingContext2D.prototype
            };
        })();

        private _context: CanvasRenderingContext2D;
        private _fontSize: string;
        private _fontFamily: string;
        private _textLineHeight: string;
        private _fontWeight: string;
        private _fontStyle: string;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this._context = canvas.getContext("2d");
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

        private ellipsePath(cx: number, cy: number, rx: number, ry: number, otpRotation?: number, startAngle?: number, endAngle?: number) {

            otpRotation = otpRotation || 0;
            startAngle = startAngle || 0;
            endAngle = endAngle || 2 * Math.PI;

            // TODO: rotation
            // TODO: startAngle
            // TODO: endAngle

            var halfRadiusX = rx * 0.545; // TODO: cercare un metodo migliore
            var halfRadiusY = ry * 0.545; // TODO: cercare un metodo migliore

            var ql = cx - halfRadiusX;
            var qt = cy - halfRadiusY;
            var qr = cx + halfRadiusX;
            var qb = cy + halfRadiusY;

            var pA = { x: cx, y: cy + ry };
            var pB = { x: cx + rx, y: cy };
            var pC = { x: cx, y: cy - ry };
            var pD = { x: cx - rx, y: cy };

            var c1B = { x: qr, y: pA.y };
            var c2B = { x: pB.x, y: qb };
            var c1C = { x: pB.x, y: qt };
            var c2C = { x: qr, y: pC.y };
            var c1D = { x: ql, y: pC.y };
            var c2D = { x: pD.x, y: qt };
            var c1A = { x: pD.x, y: qb };
            var c2A = { x: ql, y: pA.y };

            this.moveTo(pA.x, pA.y);
            this.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
            this.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
            this.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
            this.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
            this.closePath();
        }

        private buildFontValue() {
            // <font-style> <font-variant> <font-weight> <font-stretch> <font-size>/<line-height> <font-family>
            
            const values: string[] = [];
            if (this.fontStyle) { values.push(this.fontStyle); }
            //if (this.fontVariant) { values.push(this.fontVariant); }
            if (this.fontWeight) { values.push(this.fontWeight); }
            //if (this.fontStretch) { values.push(this.fontStretch); }
            if (this.textLineHeight) {
                values.push(`${this.fontSize}/${this.textLineHeight}`);
            } else {
                values.push(this.fontSize);
            }
            values.push(this.fontFamily);

            return values.join(" ");
        }

        public readonly name = "CanvasRenderer";


        // compositing

        public get globalAlpha() {
            return this._context.globalAlpha;
        }
        public set globalAlpha(value: number) {
            this._context.globalAlpha = value;
        }

        public get globalCompositeOperation() {
            return this._context.globalCompositeOperation;
        }
        public set globalCompositeOperation(value: string) {
            this._context.globalCompositeOperation = value;
        }


        // colors, styles, shadows

        public get fillStyle() {
            return this._context.fillStyle;
        }
        public set fillStyle(value: RendererBrush) {
            this._context.fillStyle = value;
        }

        public get strokeStyle() {
            return this._context.strokeStyle;
        }
        public set strokeStyle(value: RendererBrush) {
            this._context.strokeStyle = value;
        }

        public get shadowBlur() {
            return this._context.shadowBlur;
        }
        public set shadowBlur(value: number) {
            this._context.shadowBlur = value;
        }

        public get shadowColor() {
            return this._context.shadowColor;
        }
        public set shadowColor(value: string) {
            this._context.shadowColor = value;
        }

        public get shadowOffsetX() {
            return this._context.shadowOffsetX;
        }
        public set shadowOffsetX(value: number) {
            this._context.shadowOffsetX = value;
        }

        public get shadowOffsetY() {
            return this._context.shadowOffsetY;
        }
        public set shadowOffsetY(value: number) {
            this._context.shadowOffsetY = value;
        }


        // gradients, pattern

        public createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
            return this._context.createLinearGradient(x0, y0, x1, y1);
        }

        public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number) {
            return this._context.createRadialGradient(x0, y0, r0, x1, y1, r1);
        }

        public createPattern(image: CanvasImageSource, repetition: string) {
            return this._context.createPattern(image, repetition);
        }


        // line style

        public get lineCap() {
            return this._context.lineCap;
        }
        public set lineCap(value: CanvasLineCap) {
            this._context.lineCap = value;
        }

        public get lineJoin() {
            return this._context.lineJoin;
        }
        public set lineJoin(value: CanvasLineJoin) {
            this._context.lineJoin = value;
        }

        public get lineWidth() {
            return this._context.lineWidth;
        }
        public set lineWidth(value: number) {
            this._context.lineWidth = value;
        }

        public get miterLimit() {
            return this._context.miterLimit;
        }
        public set miterLimit(value: number) {
            this._context.miterLimit = value;
        }

        public get lineDashOffset() {
            return this._context.lineDashOffset;
        }
        public set lineDashOffset(value: number) {
            this._context.lineDashOffset = value;
        }

        public getLineDash() {
            return this._context.getLineDash();
        }

        public setLineDash(segments: Iterable<number>) {
            this._context.setLineDash(segments);
        }


        // text style

        public get textLineHeight() {
            return this._textLineHeight;
        }
        public set textLineHeight(value: string) {
            this._textLineHeight = value;
            this._context.font = this.buildFontValue();
        }

        public get fontSize() {
            return this._fontSize;
        }
        public set fontSize(value: string) {
            this._fontSize = value;
            this._context.font = this.buildFontValue();
        }

        public get fontStyle() {
            return this._fontStyle;
        }
        public set fontStyle(value: string) {
            this._fontStyle = value;
            this._context.font = this.buildFontValue();
        }

        public get fontWeight() {
            return this._fontWeight;
        }
        public set fontWeight(value: string) {
            this._fontWeight = value;
            this._context.font = this.buildFontValue();
        }

        public get fontFamily() {
            return this._fontFamily;
        }
        public set fontFamily(value: string) {
            this._fontFamily = value;
            this._context.font = this.buildFontValue();

        }

        public get textAlign() {
            return this._context.textAlign;
        }
        public set textAlign(value: CanvasTextAlign) {
            this._context.textAlign = value;
        }

        public get textBaseline() {
            return this._context.textBaseline;
        }
        public set textBaseline(value: CanvasTextBaseline) {
            this._context.textBaseline = value;
        }

        public get direction() {
            return this._context.direction;
        }
        public set direction(value: CanvasDirection) {
            this._context.direction = value;
        }


        // context, canvas

        public saveState() {
            this._context.save();
        }

        public restoreState() {
            this._context.restore();
        }

        public toDataURL(type?: string, quality?: any) {
            if (this.canvas instanceof HTMLCanvasElement) {
                return this.canvas.toDataURL(type, quality);
            }
            else {
                const imageData = this._context.getImageData(0, 0, this.canvas.width, this.canvas.height);
                const canvasGraphics = Cgx.Engine.createGraphics(this.canvas.width, this.canvas.height);
                canvasGraphics.putImageData(imageData, 0, 0);
                return canvasGraphics.getDataURL(type, quality);
            }
        }


        // clear, stroke, fill, clip

        public clearRect(x: number, y: number, width: number, height: number, fillStyle?: RendererBrush) {
            if (typeof fillStyle === "undefined" || fillStyle === null) {
                this._context.clearRect(x, y, width, height);
            } else {
                this._context.fillStyle = fillStyle;
                this._context.fillRect(x, y, width, height);
            }
        }

        public strokeRect(x: number, y: number, width: number, height: number) {
            this._context.strokeRect(x, y, width, height);
        }

        public fillRect(x: number, y: number, width: number, height: number) {
            this._context.fillRect(x, y, width, height);
        }

        public stroke() {
            this._context.stroke();
        }

        public fill(fillRule?: CanvasFillRule) {
            this._context.fill(fillRule);
        }

        public strokePath2D(path2D: Path2D) {
            this._context.stroke(path2D);
        }

        public fillPath2D(path2D: Path2D, fillRule?: CanvasFillRule) {
            this._context.fill(path2D, fillRule);
        }

        public clip() {
            this._context.clip();
        }


        // shapes

        public rect(x: number, y: number, width: number, height: number) {
            this._context.rect(x, y, width, height);
        }

        public square(x: number, y: number, size: number) {
            this._context.rect(x, y, size, size);
        }

        public ellipse(x: number, y: number, rx: number, ry: number, rotation?: number, startAngle?: number, endAngle?: number) {
            if (CanvasRenderer.support.ellipseDrawing) {
                rotation = rotation || 0;
                startAngle = startAngle || 0;
                endAngle = endAngle || 2 * Math.PI;
                this._context.ellipse(x, y, rx, ry, rotation, startAngle, endAngle);
            }
            else {
                // ellipse polyfill
                this.ellipsePath(x, y, rx, ry, rotation, startAngle, endAngle);
            }
        }

        public circle(x: number, y: number, r: number) {
            if (CanvasRenderer.support.ellipseDrawing) {
                this._context.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
            }
            else {
                this._context.arc(x, y, r, 0, 2 * Math.PI, false);
            }
        }

        public arc(x: number, y: number, r: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
            this._context.arc(x, y, r, startAngle, endAngle, anticlockwise);
        }


        // path

        public beginPath() {
            this._context.beginPath();
        }

        public closePath() {
            this._context.closePath();
        }

        public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
            this._context.arcTo(x1, y1, x2, y2, radius);
        }

        public moveTo(x: number, y: number) {
            this._context.moveTo(x, y);
        }

        public lineTo(x: number, y: number) {
            this._context.lineTo(x, y);
        }

        public bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number) {
            this._context.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
        }

        public quadraticCurveTo(cx: number, cy: number, x: number, y: number) {
            this._context.quadraticCurveTo(cx, cy, x, y);
        }


        // hit testing

        public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule) {
            return this._context.isPointInPath(x, y, fillRule);
        }

        public isPointInPath2D(path2D: Path2D, x: number, y: number, fillRule?: CanvasFillRule) {
            return this._context.isPointInPath(path2D, x, y, fillRule);
        }

        public isPointInStroke(x: number, y: number) {
            return this._context.isPointInStroke(x, y);
        }

        public isPointInPath2DStroke(path2D: Path2D, x: number, y: number) {
            return this._context.isPointInStroke(path2D, x, y);
        }

        public addHitRegion(options?: any) {
            if (CanvasRenderer.support.addHitRegion) {
                (<any>this._context).addHitRegion(options);
            } else {
                console.log("unsupported function 'addHitRegion'");
            }
        }

        public removeHitRegion(id: string) {
            if (CanvasRenderer.support.removeHitRegion) {
                (<any>this._context).removeHitRegion(id);
            } else {
                console.log("unsupported function 'removeHitRegion'");
            }
        }

        public clearHitRegions() {
            if (CanvasRenderer.support.clearHitRegion) {
                (<any>this._context).clearHitRegions();
            } else {
                console.log("unsupported function 'clearHitRegions'");
            }
        }


        // image, imageData

        public drawImage(img: CanvasImageSource, dx: number, dy: number, dw?: number, dh?: number, sx?: number, sy?: number, sw?: number, sh?: number) {
            this._context.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh);
        }

        public createImageData(width: number, height: number) {
            return this._context.createImageData(width, height);
        }

        public cloneImageData(imageData: ImageData) {
            var imageDataArrayCopy = new Uint8ClampedArray(imageData.data);
            imageDataArrayCopy.set(imageData.data);
            return new ImageData(imageDataArrayCopy, imageData.width, imageData.height);
        }

        public getImageData(sx: number, sy: number, sw: number, sh: number) {
            sx = sx || 0;
            sy = sy || 0;
            sw = sw || this._context.canvas.width;
            sh = sh || this._context.canvas.height;
            return this._context.getImageData(sx, sy, sw, sh);
        }

        public putImageData(imageData: ImageData, x: number, y: number) {
            this._context.putImageData(imageData, x, y);
        }

        public get imageSmoothingEnabled(): boolean {
            return (<any>this._context).mozImageSmoothingEnabled || (<any>this._context).webkitImageSmoothingEnabled || (<any>this._context).msImageSmoothingEnabled || (<any>this._context).imageSmoothingEnabled;
        }
        public set imageSmoothingEnabled(v: boolean) {
            (<any>this._context).mozImageSmoothingEnabled = v;
            (<any>this._context).webkitImageSmoothingEnabled = v;
            (<any>this._context).msImageSmoothingEnabled = v;
            (<any>this._context).imageSmoothingEnabled = v;
        }


        // text

        public fillText(text: string, x: number, y: number, maxWidth?: number) {
            this._context.fillText(text, x, y, maxWidth);
        }

        public strokeText(text: string, x: number, y: number, maxWidth?: number) {
            this._context.strokeText(text, x, y, maxWidth);
        }

        public measureText(text: string) {
            return this._context.measureText(text);
        }


        // transformations

        public rotate(angle: number) {
            this._context.rotate(angle);
        }

        public translate(dx: number, dy: number) {
            this._context.translate(dx, dy);
        }

        public scale(x: number, y: number) {
            this._context.scale(x, y);
        }

        public transform(a: number, b: number, c: number, d: number, e: number, f: number) {
            this._context.transform(a, b, c, d, e, f);
        }

        public setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
            this._context.setTransform(a, b, c, d, e, f);
        }

        public resetTransform() {
            this._context.setTransform(1, 0, 0, 1, 0, 0);
        };


        // misc

        public drawFocusIfNeeded(element: Element) {
            this._context.drawFocusIfNeeded(element);
        }
    }
}