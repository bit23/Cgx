
(function (lib) {

    var CoreGraphics = (function () {

        function TransformManager(renderer) {

            var _transforms = [];
            var _renderer = renderer;

            this.push = function (transform) {
                var mtx = transform.getMatrix();
                _transforms.push(transform);
                _renderer.saveState();
                _renderer.transform(mtx.m11, mtx.m12, mtx.m21, mtx.m22, mtx.offsetX, mtx.offsetY);
            };

            this.pop = function () {
                var result = _transforms.push();
                _renderer.restoreState();
                return result;
            };

            Object.defineProperty(this, "length", {
                get: function () { return _transforms.length; }
            });
        }

        function CoreGraphics(canvas) {

            var FULL_ANGLE = 2 * Math.PI;

            var _self = this;
            var _canvas = canvas;
            var _renderer;
            var _transformManager;

            var _fill = 0xffffffff;
            var _stroke = 0xff000000;
            var _strokeWidth = 1;
            var _shadow;
            var _fontSize = 16;
            var _fontFamily = "Arial";
            var _textAlign = "left";
            var _textBaseline = "bottom";


            function _init() {
                _renderer = lib.Cgx.Engine.createDefaultRenderer(_canvas);
                _transformManager = new TransformManager(_renderer);
            }



            function applyEntityTransform(transform, insertPointx, insertPointY) {

                // move to entity insert point
                _renderer.translate(insertPointx, insertPointY);

                var mtx;

                if (transform) {

                    // move to transform origin
                    _renderer.translate(transform.originX, transform.originY);

                    mtx = transform.getMatrix();
                    // apply matrix transform to the renderer
                    _renderer.transform(mtx.m11, mtx.m12, mtx.m21, mtx.m22, mtx.offsetX, mtx.offsetY);

                    // back transform origin
                    _renderer.translate(-transform.originX, -transform.originY);
                }

                // back from entity insert point
                _renderer.translate(-insertPointx, -insertPointY);
            }

            function createCanvasColorOrBrush(value) {
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
                else if (value instanceof lib.Cgx.GradientBrush) {

                    var result;

                    if (value instanceof lib.Cgx.LinearGradientBrush) {
                        result = _renderer.createLinearGradient(value.x0, value.y0, value.x1, value.y1);
                    }
                    else if (value instanceof lib.Cgx.RadialGradientBrush) {
                        result = _renderer.createRadialGradient(value.x0, value.y0, value.r0, value.x1, value.y1, value.r1);
                    }
                    
                    var colorStops = value._getColorStops();
                    for (var i = 0; i < colorStops.length; i++) {
                        result.addColorStop(colorStops[i].offset, colorStops[i].color);
                    }

                    return result;
                }
                else if (value instanceof lib.Cgx.PatternBrush) {
                    return _renderer.createPattern(value.image, value.repetition);
                }

                return value;
            }



            this.getImageData = function (sx, sy, sw, sh) {
                return _renderer.getImageData(sx, sy, sw, sh);
            };



            this.setShadow = function (shadow) {
                _shadow = shadow;

                // TODO:
                //if (!!this.scaleStyles) {
                //    _shadow = shadow.clone();
                //    _shadow.blur *= _viewTransform.viewZoom;
                //    _shadow.offsetX *= _viewTransform.viewZoom;
                //    _shadow.offsetY *= _viewTransform.viewZoom;
                //}
                //_renderer.shadow = _shadow;
            };

            this.getShadow = function () {
                return _shadow;
            };

            this.setFillBrush = function (fillBrush) {
                _fill = fillBrush;
                _renderer.fillStyle = createCanvasColorOrBrush(fillBrush);
            };

            this.getFillBrush = function () {
                return _fill;
            };

            this.setStrokeBrush = function (strokeBrush) {
                _stroke = strokeBrush;
                _renderer.strokeStyle = createCanvasColorOrBrush(strokeBrush);
            };

            this.getStrokeBrush = function () {
                return _stroke;
            };

            this.setStrokeWidth = function (strokeWidth) {
                _strokeWidth = strokeWidth;
                _renderer.lineWidth = strokeWidth;
            };

            this.getStrokeWidth = function () {
                return _strokeWidth;
            };

            this.setFontFamily = function (fontFamily) {
                _fontFamily = fontFamily;
                _renderer.fontFamily = fontFamily;
            };

            this.getFontFamily = function () {
                return _fontFamily;
            };

            this.setFontSize = function (fontSize) {
                _fontSize = fontSize;
                _renderer.fontSize = _fontSize;
            };

            this.getFontSize = function () {
                return _fontSize;
            };

            this.setTextAlign = function (align) {
                _textAlign = align;
                _renderer.textAlign = _textAlign;
            };

            this.getTextAlign = function () {
                return _textAlign;
            };

            this.setTextBaseline = function (baseline) {
                _textBaseline = baseline;
                _renderer.textBaseline = _textBaseline;
            };

            this.getTextBaseline = function () {
                return _textBaseline;
            };


            this.measureText = function (text) {
                return _renderer.measureText(text);
            };

            this.clear = function (optFillBrush) {
                _self.clearRect(0, 0, _renderer.canvas.width, _renderer.canvas.height, optFillBrush);
            };

            this.clearRect = function (x, y, width, height, optFillBrush) {
                var fillStyle = null;
                if (typeof optFillBrush !== "undefined" && optFillBrush !== null) {
                    fillStyle = createCanvasColorOrBrush(optFillBrush);
                }
                _renderer.clearRect(0, 0, _renderer.canvas.width, _renderer.canvas.height, fillStyle);
            };


            this.drawArc = function (cx, cy, radius, startAngle, endAngle, isAntiClockwise, optTransform) {

                if (!_stroke || _strokeWidth == 0)
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, cx, cy);

                _renderer.beginPath();
                _renderer.arc(cx, cy, radius, startAngle, endAngle, !!isAntiClockwise);
                _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawLine = function (x1, y1, x2, y2, optTransform) {

                if (!_stroke || _strokeWidth == 0)
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x1, y1);

                _renderer.beginPath();
                _renderer.moveTo(x1, y1);
                _renderer.lineTo(x2, y2);

                _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawRoundedRectangle = function (x, y, width, height, cornersRadius, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
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

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                _renderer.beginPath();

                var currentX = x;
                var currentY = y;

                if (topLeftCorner == 0) {
                    _renderer.moveTo(currentX, currentY);
                } else {
                    _renderer.moveTo(currentX + topLeftCorner, currentY);
                }

                currentX = x + width;
                if (topRightCorner == 0) {
                    _renderer.lineTo(currentX, currentY);
                } else {
                    _renderer.lineTo(currentX - topRightCorner, currentY);
                    _renderer.arcTo(currentX, currentY, currentX, currentY + topRightCorner, topRightCorner);
                }

                currentY = y + height;
                if (bottomRightCorner == 0) {
                    _renderer.lineTo(currentX, currentY);
                } else {
                    _renderer.lineTo(currentX, currentY - bottomRightCorner);
                    _renderer.arcTo(currentX, currentY, currentX - bottomRightCorner, currentY, bottomRightCorner);
                }

                currentX = x;
                if (bottomLeftCorner == 0) {
                    _renderer.lineTo(currentX, currentY);
                } else {
                    _renderer.lineTo(currentX + bottomLeftCorner, currentY);
                    _renderer.arcTo(currentX, currentY, currentX, currentY - bottomLeftCorner, bottomLeftCorner);
                }

                currentY = y;
                if (topLeftCorner == 0) {
                    _renderer.lineTo(currentX, currentY);
                } else {
                    _renderer.lineTo(currentX, currentY + topLeftCorner);
                    _renderer.arcTo(currentX, currentY, currentX + topRightCorner, currentY, topLeftCorner);
                }

                _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawSquare = function (x, y, size, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                _renderer.beginPath();
                _renderer.square(x, y, size);

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawRectangle = function (x, y, width, height, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                _renderer.beginPath();
                _renderer.rect(x, y, width, height);

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawCircle = function (cx, cy, radius, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, cx, cy);

                _renderer.beginPath();
                _renderer.circle(cx, cy, radius);

                //if ("ellipse" in _renderer) {
                //    _renderer.ellipse(cx, cy, radius, radius);
                //}
                //else if ("arc" in _renderer) {
                //    _renderer.arc(cx, cy, radius, 0, FULL_ANGLE, false);
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
                //    _renderer.moveTo(pA.x, pA.y);
                //    _renderer.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
                //    _renderer.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
                //    _renderer.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
                //    _renderer.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
                //    _renderer.closePath();
                //}

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawEllipse = function (cx, cy, radiusX, radiusY, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, cx, cy);

                _renderer.beginPath();
                _renderer.ellipse(cx, cy, radiusX, radiusY);

                //if ("ellipse" in _renderer) {
                //    _renderer.ellipse(cx, cy, radiusX, radiusY);
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
                //    //_renderer.rect(cx - radiusX, cy - radiusY, radiusX * 2, radiusY * 2);
                //    _renderer.moveTo(pA.x, pA.y);
                //    _renderer.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
                //    _renderer.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
                //    _renderer.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
                //    _renderer.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
                //    _renderer.closePath();
                //}

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawPolyline = function (points, optTransform) {

                if (!_stroke || _strokeWidth == 0)
                    return;

                var p0x = points[0].x;
                var p0y = points[0].y;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, p0x, p0y);

                _renderer.beginPath();
                _renderer.moveTo(p0x, p0y);
                for (var i = 1; i < points.length; i++) {
                    var p = points[i];
                    _renderer.lineTo(p.x, p.y);
                }
                _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawPolygon = function (points, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                var p0x = points[0].x;
                var p0y = points[0].y;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, p0x, p0y);

                _renderer.beginPath();
                _renderer.moveTo(p0x, p0y);
                for (var i = 1; i < points.length; i++) {
                    var p = points[i];
                    _renderer.lineTo(p.x, p.y);
                }
                _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawTriangle = function (point1, point2, point3, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, point1.x, point1.y);

                _renderer.beginPath();
                _renderer.moveTo(point1.x, point1.y);
                _renderer.lineTo(point2.x, point2.y);
                _renderer.lineTo(point3.x, point3.y);
                _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawQuad = function (point1, point2, point3, point4, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, point1.x, point1.y);

                _renderer.beginPath();
                _renderer.moveTo(point1.x, point1.y);
                _renderer.lineTo(point2.x, point2.y);
                _renderer.lineTo(point3.x, point3.y);
                _renderer.lineTo(point4.x, point4.y);
                _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawCubicCurve = function (points, controlPoints1, controlPoints2, isClosed, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                var p0x = points[0].x;
                var p0y = points[0].y;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, p0x, p0y);

                points.push(points[0]);

                _renderer.beginPath();
                _renderer.moveTo(p0x, p0y);
                for (var i = 0; i < controlPoints1.length; i++) {
                    var c1 = controlPoints1[i];
                    var c2 = controlPoints2[i];
                    var p = points[i + 1];
                    _renderer.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p.x, p.y);
                }

                if (isClosed)
                    _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawQuadraticCurve = function (points, controlPoints, isClosed, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                var p0x = points[0].x;
                var p0y = points[0].y;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, p0x, p0y);

                points.push(points[0]);

                _renderer.beginPath();
                _renderer.moveTo(p0x, p0y);
                for (var i = 0; i < controlPoints.length; i++) {
                    var c1 = controlPoints[i];
                    var p = points[i + 1];
                    _renderer.quadraticCurveTo(c1.x, c1.y, p.x, p.y);
                }

                if (isClosed)
                    _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawImage = function (image, x, y, width, height, optTransform) {

                if (!image && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                _renderer.drawImage(image, x, y, width, height);
                if (_stroke && _strokeWidth > 0) {
                    _renderer.beginPath();
                    _renderer.rect(x, y, width, height);
                    _renderer.stroke();
                }

                _renderer.restoreState();
            };

            this.drawText = function (x, y, text, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                if (_fill)
                    _renderer.fillText(text, x, y);
                if (_stroke && _strokeWidth > 0)
                    _renderer.strokeText(text, x, y);

                _renderer.restoreState();
            };

            this.drawPath2D = function (x, y, path2D, optFillRule, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                optFillRule = optFillRule || null;

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, x, y);

                // move to path2D insert point
                _renderer.translate(x, y);

                if (_fill)
                    _renderer.fillPath2D(path2D, optFillRule);
                if (_stroke && _strokeWidth > 0)
                    _renderer.strokePath2D(path2D);

                _renderer.restoreState();
            };

            this.drawPie = function (cx, cy, radius, startAngle, endAngle, isAntiClockwise, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
                    return;

                var deltaAngle = endAngle - startAngle;
                if (deltaAngle >= FULL_ANGLE) {
                    this.drawCircle(cx, cy, radius, optTransform);
                    return;
                }

                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, cx, cy);

                _renderer.beginPath();
                _renderer.moveTo(cx, cy);
                _renderer.arc(cx, cy, radius, startAngle, endAngle, !!isAntiClockwise);
                _renderer.closePath();

                if (_fill)
                    _renderer.fill();
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            this.drawDonut = function (cx, cy, startRadius, endRadius, startAngle, endAngle, isAntiClockwise, optTransform) {

                if (!_fill && (!_stroke || _strokeWidth == 0))
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
                if (deltaAngle >= FULL_ANGLE) {
                    isClosed = true;
                    //this.drawCircle(cx, cy, radius, optTransform);
                    //return;
                }

                if (!hasHole) {

                    if (isClosed) {
                        this.drawCircle(cx, cy, endRadius, optTransform);
                        return;
                    }
                    else {
                        this.drawPie(cx, cy, endRadius, startAngle, endAngle, optTransform);
                        return;
                    }
                }


                _renderer.saveState();

                // apply entity transform
                applyEntityTransform(optTransform, cx, cy);

                _renderer.beginPath();

                if (isClosed) {
                    _renderer.circle(cx, cy, endRadius);
                    _renderer.circle(cx, cy, startRadius);
                }
                else {
                    _renderer.arc(cx, cy, endRadius, startAngle, endAngle, !!isAntiClockwise);
                    _renderer.arc(cx, cy, startRadius, endAngle, startAngle, !isAntiClockwise);
                    _renderer.closePath();
                }

                if (_fill)
                    _renderer.fill("evenodd");
                if (_stroke && _strokeWidth > 0)
                    _renderer.stroke();

                _renderer.restoreState();
            };

            //this.drawAxes = function () {

            //    _renderer.saveState();

            //    _renderer.lineWidth = 1;
            //    _renderer.strokeStyle = "rgba(255,0,0,0.5)";
            //    _renderer.beginPath();
            //    _renderer.moveTo(0, 0);
            //    _renderer.lineTo(_canvas.width, 0);
            //    _renderer.stroke();
            //    _renderer.strokeStyle = "rgba(0,255,0,0.5)";
            //    _renderer.beginPath();
            //    _renderer.moveTo(0, _canvas.height);
            //    _renderer.lineTo(0, 0);
            //    _renderer.stroke();

            //    _renderer.restoreState();
            //};

            this.drawSymbol = function (x, y, symbolData) {

                _renderer.saveState();

                if (!symbolData && (!_stroke || _strokeWidth == 0))
                    return;
                _renderer.drawImage(symbolData, x, y, symbolData.width, symbolData.height);

                _renderer.restoreState();
            };

            // this.drawVertex = function (x, y, optTransform, optTransformOriginX, optTransformOriginY) {
            //     this.drawVertices([{ x: x, y: y }], optTransform, optTransformOriginX, optTransformOriginY);
            // };

            // this.drawVertices = function (points, optTransform, optTransformOriginX, optTransformOriginY) {

            //     if (optTransform) {
            //         optTransformOriginX = optTransformOriginX || 0;
            //         optTransformOriginY = optTransformOriginY || 0;
            //     }

            //     _renderer.fillStyle = lib.Vgx.Vars.vertexFillColor;
            //     _renderer.strokeStyle = lib.Vgx.Vars.vertexStrokeColor;
            //     _renderer.lineWidth = lib.Vgx.Vars.vertexStrokeWidth / _viewTransform.viewZoom;

            //     // riduce/aumenta la dimensione in base al grado di zoom
            //     // in modo da avere un elemento di dimensione fissa a schermo
            //     var radius = lib.Vgx.Vars.vertexSize / _viewTransform.viewZoom;
            //     var size = radius * 2;

            //     _renderer.saveState();

            //     // apply entity transform
            //     applyEntityTransform(optTransform, optTransformOriginX, optTransformOriginY);


            //     _renderer.beginPath();

            //     points.forEach((v, i, a) => {
            //         if ("ellipse" in _renderer) {
            //             // to fix move line drawing from center to ellipse start
            //             _renderer.moveTo(v.x + radius, v.y);
            //             _renderer.ellipse(v.x, v.y, radius, radius);
            //         } else {
            //             _renderer.rect(v.x - radius, v.y - radius, size, size);
            //         }
            //     });

            //     if (_fill)
            //         _renderer.fill();
            //     if (_stroke && _strokeWidth > 0)
            //         _renderer.stroke();

            //     _renderer.restoreState();
            // };



            Object.defineProperty(this, "pushTransform", {
                value: function (transform) {
                    _transformManager.push(transform);
                }
            });

            Object.defineProperty(this, "popTransform", {
                value: function () {
                    _transformManager.pop();
                }
            });



            _init();
        }

        return CoreGraphics;

    })();
    lib.Cgx.CoreGraphics = CoreGraphics;

})(library);