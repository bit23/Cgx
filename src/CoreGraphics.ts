
namespace Cgx {

    export type CanvasSurface = HTMLCanvasElement | OffscreenCanvas;

    export type GraphicsTarget = CanvasSurface | GraphicsRenderer;

    export class CoreGraphics {

        private _canvasBuffer: CanvasSurface;
        private _renderer: GraphicsRenderer;
        private _transformManager: TransformManager;
        private _fill: BrushDefinition = 0xffffffff;
        private _stroke: BrushDefinition = 0xff000000;
        private _strokeWidth = 1;
        private _shadow: Shadow;
        private _textLineHeight = "1.5em";
        private _fontWeight = "normal";
        private _fontStyle = "normal";
        private _fontSize = "16px";
        private _fontFamily = "sans-serif";
        private _textAlign: CanvasTextAlign = "left";
        private _textBaseline: CanvasTextBaseline = "bottom";
        private readonly FULL_ANGLE = 2 * Math.PI;


        constructor(target: GraphicsTarget) {
            if (target instanceof GraphicsRenderer) {
                this._renderer = target;
                this._canvasBuffer = this._renderer.canvas;
            } else {
                this._canvasBuffer = target;
                this._renderer = Engine.createDefaultRenderer(this._canvasBuffer);
            }

            this._transformManager = new TransformManager(this._renderer);
        }


        private applyEntityTransform(transform: Transform, insertPointX: number, insertPointY: number) {

            // move to entity insert point
            this._renderer.translate(insertPointX, insertPointY);

            var mtx;

            if (transform) {

                // move to transform origin
                this._renderer.translate(transform.originX, transform.originY);

                mtx = transform.getMatrix();
                // apply matrix transform to the renderer
                this._renderer.transform(mtx.m11, mtx.m12, mtx.m21, mtx.m22, mtx.offsetX, mtx.offsetY);

                // back transform origin
                this._renderer.translate(-transform.originX, -transform.originY);
            }

            // back from entity insert point
            this._renderer.translate(-insertPointX, -insertPointY);
        }

        private createCanvasColorOrBrush(value: BrushDefinition) {

            if (typeof (value) === "number") {
                return "#" + value.toString(16);
            }
            else if (typeof (value) === "string") {
                return value;
            }
            else if (value instanceof Array) { // [r,g,b,a] | [r,g,b]
                if (value.length == 3) {
                    return "rgb(" + value.join(",") + ")";
                }
                else if (value.length == 4) {
                    return "rgba(" + value.join(",") + ")";
                }
                else {
                    throw new Error("invalid length");
                }
            }
            else if (value instanceof GradientBrush) {

                var result;

                if (value instanceof LinearGradientBrush) {
                    result = this._renderer.createLinearGradient(value.x0, value.y0, value.x1, value.y1);
                }
                else if (value instanceof RadialGradientBrush) {
                    result = this._renderer.createRadialGradient(value.x0, value.y0, value.r0, value.x1, value.y1, value.r1);
                }

                var colorStops = value.getColorStops();
                for (var i = 0; i < colorStops.length; i++) {
                    result.addColorStop(colorStops[i].offset, colorStops[i].color);
                }

                return result;
            }
            else if (value instanceof PatternBrush) {
                return this._renderer.createPattern(value.image, value.repetition);
            }

            return value;
        }


        public get canvasBuffer() {
            return this._canvasBuffer;
        }

        public get renderer() {
            return this._renderer;
        }

        public get shadow() {
            return this._shadow;
        }
        public set shadow(v: Shadow) {
            this._shadow = v;
            // TODO:
            //if (!!this.scaleStyles) {
            //    _shadow = shadow.clone();
            //    _shadow.blur *= _viewTransform.viewZoom;
            //    _shadow.offsetX *= _viewTransform.viewZoom;
            //    _shadow.offsetY *= _viewTransform.viewZoom;
            //}
            if (v) {
                this._renderer.shadowBlur = v.blur;
                this._renderer.shadowOffsetX = v.offsetX;
                this._renderer.shadowOffsetY = v.offsetY;
                this._renderer.shadowColor = v.color;
            } else {
                this._renderer.shadowBlur = 0;
                this._renderer.shadowOffsetX = 0;
                this._renderer.shadowOffsetY = 0;
                this._renderer.shadowColor = "transparent";
            }
        }

        public get fillBrush() {
            return this._fill;
        }
        public set fillBrush(v: BrushDefinition) {
            this._fill = v;
            this._renderer.fillStyle = this.createCanvasColorOrBrush(v);
        }

        public get strokeBrush() {
            return this._stroke;
        }
        public set strokeBrush(v: BrushDefinition) {
            this._stroke = v;
            this._renderer.strokeStyle = this.createCanvasColorOrBrush(v);
        }

        public get strokeWidth() {
            return this._strokeWidth;
        }
        public set strokeWidth(v: number) {
            this._strokeWidth = v;
            this._renderer.lineWidth = v;
        }

        public get fontFamily() {
            return this._fontFamily;
        }
        public set fontFamily(v: string) {
            this._fontFamily = v;
            this._renderer.fontFamily = v;
        }

        public get textLineHeight() {
            return this._textLineHeight;
        }
        public set textLineHeight(v: string) {
            this._textLineHeight = v;
            this._renderer.textLineHeight = v;
        }

        public get fontSize() {
            return this._fontSize;
        }
        public set fontSize(v: string) {
            this._fontSize = v;
            this._renderer.fontSize = v;
        }

        public get fontStyle() {
            return this._fontStyle;
        }
        public set fontStyle(v: string) {
            this._fontStyle = v;
            this._renderer.fontStyle = v;
        }

        public get fontWeight() {
            return this._fontWeight;
        }
        public set fontWeight(v: string) {
            this._fontWeight = v;
            this._renderer.fontWeight = v;
        }

        public get textAlign() {
            return this._textAlign;
        }
        public set textAlign(v: CanvasTextAlign) {
            this._textAlign = v;
            this._renderer.textAlign = v;
        }

        public get textBaseline() {
            return this._textBaseline;
        }
        public set textBaseline(v: CanvasTextBaseline) {
            this._textBaseline = v;
            this._renderer.textBaseline = v;
        }


        public getImageData(sx: number, sy: number, sw: number, sh: number) {
            return this._renderer.getImageData(sx, sy, sw, sh);
        }

        public putImageData(imageData: ImageData, x: number, y: number) {
            return this._renderer.putImageData(imageData, x, y);
        }

        public getDataURL(type?: string, quality?: any) {
            return this._renderer.toDataURL(type, quality);
        }

        public pushTransform(transform: Transform) {
            this._transformManager.push(transform);
        }

        public popTransform() {
            this._transformManager.pop();
        }



        public measureText(text: string) {
            return this._renderer.measureText(text);
        }

        public clear(fillBrush?: BrushDefinition) {
            this.clearRect(0, 0, this._renderer.canvas.width, this._renderer.canvas.height, fillBrush);
        }

        public clearRect(x: number, y: number, width: number, height: number, fillBrush?: BrushDefinition) {
            var fillStyle = null;
            if (typeof fillBrush !== "undefined" && fillBrush !== null) {
                fillStyle = this.createCanvasColorOrBrush(fillBrush);
            }
            this._renderer.clearRect(x, y, width, height, fillStyle);
        }


        public drawArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, isAntiClockwise: boolean, transform?: Transform) {

            if (!this._stroke || this._strokeWidth == 0)
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, cx, cy);

            this._renderer.beginPath();
            this._renderer.arc(cx, cy, radius, 0, startAngle, endAngle, !!isAntiClockwise);
            this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawLine(x1: number, y1: number, x2: number, y2: number, transform?: Transform) {

            if (!this._stroke || this._strokeWidth == 0)
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x1, y1);

            this._renderer.beginPath();
            this._renderer.moveTo(x1, y1);
            this._renderer.lineTo(x2, y2);

            this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawRoundedRectangle(x: number, y: number, width: number, height: number, cornersRadius: CornersRadiusDefinition, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var topLeftCorner = 0;
            var topRightCorner = 0;
            var bottomLeftCorner = 0;
            var bottomRightCorner = 0;
            if (cornersRadius instanceof Array) {
                topLeftCorner = cornersRadius[0];
                topRightCorner = cornersRadius[0];
                bottomLeftCorner = cornersRadius[0];
                bottomRightCorner = cornersRadius[0];
            }
            else if (typeof cornersRadius === "number") {
                topLeftCorner = topRightCorner = bottomLeftCorner = bottomRightCorner = cornersRadius;
            }
            else if (typeof cornersRadius === "object") {
                topLeftCorner = cornersRadius.topLeft;
                topRightCorner = cornersRadius.topRight;
                bottomLeftCorner = cornersRadius.bottomLeft;
                bottomRightCorner = cornersRadius.bottomRight;
            }

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            this._renderer.beginPath();

            var currentX = x;
            var currentY = y;

            if (topLeftCorner == 0) {
                this._renderer.moveTo(currentX, currentY);
            } else {
                this._renderer.moveTo(currentX + topLeftCorner, currentY);
            }

            currentX = x + width;
            if (topRightCorner == 0) {
                this._renderer.lineTo(currentX, currentY);
            } else {
                this._renderer.lineTo(currentX - topRightCorner, currentY);
                this._renderer.arcTo(currentX, currentY, currentX, currentY + topRightCorner, topRightCorner);
            }

            currentY = y + height;
            if (bottomRightCorner == 0) {
                this._renderer.lineTo(currentX, currentY);
            } else {
                this._renderer.lineTo(currentX, currentY - bottomRightCorner);
                this._renderer.arcTo(currentX, currentY, currentX - bottomRightCorner, currentY, bottomRightCorner);
            }

            currentX = x;
            if (bottomLeftCorner == 0) {
                this._renderer.lineTo(currentX, currentY);
            } else {
                this._renderer.lineTo(currentX + bottomLeftCorner, currentY);
                this._renderer.arcTo(currentX, currentY, currentX, currentY - bottomLeftCorner, bottomLeftCorner);
            }

            currentY = y;
            if (topLeftCorner == 0) {
                this._renderer.lineTo(currentX, currentY);
            } else {
                this._renderer.lineTo(currentX, currentY + topLeftCorner);
                this._renderer.arcTo(currentX, currentY, currentX + topRightCorner, currentY, topLeftCorner);
            }

            this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawSquare(x: number, y: number, size: number, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            this._renderer.beginPath();
            this._renderer.square(x, y, size);

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawRectangle(x: number, y: number, width: number, height: number, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            this._renderer.beginPath();
            this._renderer.rect(x, y, width, height);

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawCircle(cx: number, cy: number, radius: number, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, cx, cy);

            this._renderer.beginPath();
            this._renderer.circle(cx, cy, radius);

            //if ("ellipse" in this._renderer) {
            //    this._renderer.ellipse(cx, cy, radius, radius);
            //}
            //else if ("arc" in this._renderer) {
            //    this._renderer.arc(cx, cy, radius, 0, FULL_ANGLE, false);
            //}
            //else {
            //    var halfRadius = radius * 0.545; // TODO: cercare un metodo migliore
            //    var ql = cx - halfRadius;
            //    var qt = cy - halfRadius;
            //    var qr = cx + halfRadius;
            //    var qb = cy + halfRadius;
            //    var pA = { x: cx, y: cx + radius };
            //    var pB = { x: cx + radius, y: cy };
            //    var pC = { x: cx, y: cy - radius };
            //    var pD = { x: cx - radius, y: cy };
            //    var c1B = { x: qr, y: pA.y };
            //    var c2B = { x: pB.x, y: qb };
            //    var c1C = { x: pB.x, y: qt };
            //    var c2C = { x: qr, y: pC.y };
            //    var c1D = { x: ql, y: pC.y };
            //    var c2D = { x: pD.x, y: qt };
            //    var c1A = { x: pD.x, y: qb };
            //    var c2A = { x: ql, y: pA.y };
            //    this._renderer.moveTo(pA.x, pA.y);
            //    this._renderer.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
            //    this._renderer.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
            //    this._renderer.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
            //    this._renderer.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
            //    this._renderer.closePath();
            //}

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawEllipse(cx: number, cy: number, radiusX: number, radiusY: number, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, cx, cy);

            this._renderer.beginPath();
            this._renderer.ellipse(cx, cy, radiusX, radiusY);

            //if ("ellipse" in this._renderer) {
            //    this._renderer.ellipse(cx, cy, radiusX, radiusY);
            //}
            //else {
            //    var halfRadiusX = radiusX * 0.545; // TODO: cercare un metodo migliore
            //    var halfRadiusY = radiusY * 0.545; // TODO: cercare un metodo migliore
            //    var ql = cx - halfRadiusX;
            //    var qt = cy - halfRadiusY;
            //    var qr = cx + halfRadiusX;
            //    var qb = cy + halfRadiusY;
            //    var pA = { x: cx, y: cy + radiusY };
            //    var pB = { x: cx + radiusX, y: cy };
            //    var pC = { x: cx, y: cy - radiusY };
            //    var pD = { x: cx - radiusX, y: cy };
            //    var c1B = { x: qr, y: pA.y };
            //    var c2B = { x: pB.x, y: qb };
            //    var c1C = { x: pB.x, y: qt };
            //    var c2C = { x: qr, y: pC.y };
            //    var c1D = { x: ql, y: pC.y };
            //    var c2D = { x: pD.x, y: qt };
            //    var c1A = { x: pD.x, y: qb };
            //    var c2A = { x: ql, y: pA.y };
            //    //this._renderer.rect(cx - radiusX, cy - radiusY, radiusX * 2, radiusY * 2);
            //    this._renderer.moveTo(pA.x, pA.y);
            //    this._renderer.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
            //    this._renderer.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
            //    this._renderer.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
            //    this._renderer.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
            //    this._renderer.closePath();
            //}

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawPolyline(points: Point[], transform?: Transform) {

            if (!this._stroke || this._strokeWidth == 0)
                return;

            var p0x = points[0].x;
            var p0y = points[0].y;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, p0x, p0y);

            this._renderer.beginPath();
            this._renderer.moveTo(p0x, p0y);
            for (var i = 1; i < points.length; i++) {
                var p = points[i];
                this._renderer.lineTo(p.x, p.y);
            }
            this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawPolygon(points: Point[], transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var p0x = points[0].x;
            var p0y = points[0].y;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, p0x, p0y);

            this._renderer.beginPath();
            this._renderer.moveTo(p0x, p0y);
            for (var i = 1; i < points.length; i++) {
                var p = points[i];
                this._renderer.lineTo(p.x, p.y);
            }
            this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawTriangle(point1: Point, point2: Point, point3: Point, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, point1.x, point1.y);

            this._renderer.beginPath();
            this._renderer.moveTo(point1.x, point1.y);
            this._renderer.lineTo(point2.x, point2.y);
            this._renderer.lineTo(point3.x, point3.y);
            this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawQuad(point1: Point, point2: Point, point3: Point, point4: Point, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, point1.x, point1.y);

            this._renderer.beginPath();
            this._renderer.moveTo(point1.x, point1.y);
            this._renderer.lineTo(point2.x, point2.y);
            this._renderer.lineTo(point3.x, point3.y);
            this._renderer.lineTo(point4.x, point4.y);
            this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawCubicCurve(points: Point[], controlPoints1: Point[], controlPoints2: Point[], isClosed: boolean, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var p0x = points[0].x;
            var p0y = points[0].y;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, p0x, p0y);

            points.push(points[0]);

            this._renderer.beginPath();
            this._renderer.moveTo(p0x, p0y);
            for (var i = 0; i < controlPoints1.length; i++) {
                var c1 = controlPoints1[i];
                var c2 = controlPoints2[i];
                var p = points[i + 1];
                this._renderer.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p.x, p.y);
            }

            if (isClosed)
                this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawQuadraticCurve(points: Point[], controlPoints: Point[], isClosed: boolean, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var p0x = points[0].x;
            var p0y = points[0].y;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, p0x, p0y);

            points.push(points[0]);

            this._renderer.beginPath();
            this._renderer.moveTo(p0x, p0y);
            for (var i = 0; i < controlPoints.length; i++) {
                var c1 = controlPoints[i];
                var p = points[i + 1];
                this._renderer.quadraticCurveTo(c1.x, c1.y, p.x, p.y);
            }

            if (isClosed)
                this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawImage(image: CanvasImageSource, x: number, y: number, width: number, height: number, transform?: Transform) {

            if (!image && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            this._renderer.drawImage(image, x, y, width, height);
            if (this._stroke && this._strokeWidth > 0) {
                this._renderer.beginPath();
                this._renderer.rect(x, y, width, height);
                this._renderer.stroke();
            }

            this._renderer.restoreState();
        }

        public drawText(x: number, y: number, text: string, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            if (this._fill)
                this._renderer.fillText(text, x, y);
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.strokeText(text, x, y);

            this._renderer.restoreState();
        }

        public drawPath2D(x: number, y: number, path2D: Path2D, fillRule?: CanvasFillRule, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, x, y);

            // move to path2D insert point
            this._renderer.translate(x, y);

            if (this._fill)
                this._renderer.fillPath2D(path2D, fillRule);
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.strokePath2D(path2D);

            this._renderer.restoreState();
        }

        public drawPie(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, isAntiClockwise?: boolean, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var deltaAngle = endAngle - startAngle;
            if (deltaAngle >= this.FULL_ANGLE) {
                this.drawCircle(cx, cy, radius, transform);
                return;
            }

            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, cx, cy);

            this._renderer.beginPath();
            this._renderer.moveTo(cx, cy);
            this._renderer.arc(cx, cy, radius, 0, startAngle, endAngle, !!isAntiClockwise);
            this._renderer.closePath();

            if (this._fill)
                this._renderer.fill();
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }

        public drawDonut(cx: number, cy: number, startRadius: number, endRadius: number, startAngle: number, endAngle: number, isAntiClockwise?: boolean, transform?: Transform) {

            if (!this._fill && (!this._stroke || this._strokeWidth == 0))
                return;

            var hasHole = true;
            var isClosed = false;

            if (startRadius > endRadius) {
                var temp = endRadius;
                endRadius = startRadius;
                startRadius = temp;
            }

            if (startRadius <= 0) {
                hasHole = false;
                //this.drawPie(cx, cy, endRadius, startAngle, endAngle);
                //return;
            }

            var deltaAngle = endAngle - startAngle;
            if (deltaAngle >= this.FULL_ANGLE) {
                isClosed = true;
                //this.drawCircle(cx, cy, radius, optTransform);
                //return;
            }

            if (!hasHole) {

                if (isClosed) {
                    this.drawCircle(cx, cy, endRadius, transform);
                    return;
                }
                else {
                    this.drawPie(cx, cy, endRadius, startAngle, endAngle, false, transform);
                    return;
                }
            }


            this._renderer.saveState();

            // apply entity transform
            this.applyEntityTransform(transform, cx, cy);

            this._renderer.beginPath();

            if (isClosed) {
                this._renderer.circle(cx, cy, endRadius);
                this._renderer.circle(cx, cy, startRadius);
            }
            else {
                this._renderer.arc(cx, cy, endRadius, 0, startAngle, endAngle, !!isAntiClockwise);
                this._renderer.arc(cx, cy, startRadius, 0, endAngle, startAngle, !isAntiClockwise);
                this._renderer.closePath();
            }

            if (this._fill)
                this._renderer.fill("evenodd");
            if (this._stroke && this._strokeWidth > 0)
                this._renderer.stroke();

            this._renderer.restoreState();
        }


        public drawSymbol(x: number, y: number, width: number, height: number, symbolData: CanvasImageSource) {

            this._renderer.saveState();

            if (!symbolData && (!this._stroke || this._strokeWidth == 0))
                return;
            this._renderer.drawImage(symbolData, x, y, width, height);

            this._renderer.restoreState();
        }
    }
}
