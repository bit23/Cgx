
/// <reference path="Renderer.js" />

(function (lib) {

    var CanvasRenderer = (function () {

        function CanvasRenderer(canvas) {
            lib.Cgx.Renderer.call(this, canvas);

            var _self = this;
            var _fontSize = 0;
            var _fontFamily = "";
            var _cachedShadow = null;
            var _context;

            var _defaultValues = {
                // read from base class
                globalAlpha: _self.globalAlpha,
                globalCompositeOperation: _self.globalCompositeOperation,
                fillStyle: _self.fillStyle,
                strokeStyle: _self.strokeStyle,
                shadowBlur: _self.shadowBlur,
                shadowColor: _self.shadowColor,
                shadowOffsetX: _self.shadowOffsetX,
                shadowOffsetY: _self.shadowOffsetY,
                lineCap: _self.lineCap,
                lineJoin: _self.lineJoin,
                lineWidth: _self.lineWidth,
                miterLimit: _self.miterLimit,
                lineDashOffset: _self.lineDashOffset,
                fontSize: _self.fontSize,
                fontFamily: _self.fontFamily,
                textAlign: _self.textAlign,
                textBaseline: _self.textBaseline,
                direction: _self.direction,
                imageSmoothingEnabled: _self.imageSmoothingEnabled
            };

            // TODO
            var _supportEllipseDrawing = 'ellipse' in CanvasRenderingContext2D.prototype;
            var _supportArcDrawing = 'arc' in CanvasRenderingContext2D.prototype;
            var _supportTextDirection = 'direction' in CanvasRenderingContext2D.prototype;
            var _supportAddHitRegion = 'addHitRegion' in CanvasRenderingContext2D.prototype;
            var _supportRemoveHitRegion = 'removeHitRegion' in CanvasRenderingContext2D.prototype;
            var _supportClearHitRegion = 'clearHitRegions' in CanvasRenderingContext2D.prototype;


            function _init() {

                _context = _self.canvas.getContext("2d");

                _self.globalAlpha = _defaultValues.globalAlpha;
                _self.globalCompositeOperation = _defaultValues.globalCompositeOperation;
                _self.fillStyle = _defaultValues.fillStyle;
                _self.strokeStyle = _defaultValues.strokeStyle;
                _self.shadowBlur = _defaultValues.shadowBlur;
                _self.shadowColor = _defaultValues.shadowColor;
                _self.shadowOffsetX = _defaultValues.shadowOffsetX;
                _self.shadowOffsetY = _defaultValues.shadowOffsetY;
                _self.lineCap = _defaultValues.lineCap;
                _self.lineJoin = _defaultValues.lineJoin;
                _self.lineWidth = _defaultValues.lineWidth;
                _self.miterLimit = _defaultValues.miterLimit;
                _self.lineDashOffset = _defaultValues.lineDashOffset;
                _self.fontSize = _defaultValues.fontSize;
                _self.fontFamily = _defaultValues.fontFamily;
                _self.textAlign = _defaultValues.textAlign;
                _self.textBaseline = _defaultValues.textBaseline;
                _self.direction = _defaultValues.direction;
                _self.imageSmoothingEnabled = _defaultValues.imageSmoothingEnabled;
            }



            function ellipsePath(x, y, rx, ry, otpRotation, optStartAngle, optEndAngle) {

                otpRotation = otpRotation || 0;
                optStartAngle = optStartAngle || 0;
                optEndAngle = optEndAngle || 2 * Math.PI;

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

                _renderer.moveTo(pA.x, pA.y);
                _renderer.bezierCurveTo(c1B.x, c1B.y, c2B.x, c2B.y, pB.x, pB.y);
                _renderer.bezierCurveTo(c1C.x, c1C.y, c2C.x, c2C.y, pC.x, pC.y);
                _renderer.bezierCurveTo(c1D.x, c1D.y, c2D.x, c2D.y, pD.x, pD.y);
                _renderer.bezierCurveTo(c1A.x, c1A.y, c2A.x, c2A.y, pA.x, pA.y);
                _renderer.closePath();
            }
    



            Object.defineProperty(this, "name", {
                value: "CanvasRenderer"
            });



            // compositing

            Object.defineProperty(this, "globalAlpha", {
                get: function () { return _context.globalAlpha; },
                set: function (v) { _context.globalAlpha = v; }
            });

            Object.defineProperty(this, "globalCompositeOperation", {
                get: function () { return _context.globalCompositeOperation; },
                set: function (v) { _context.globalCompositeOperation = v; }
            });


            // colors, styles, shadows

            Object.defineProperty(this, "fillStyle", {
                get: function () { return _context.fillStyle; },
                set: function (v) { _context.fillStyle = v; }
            });

            Object.defineProperty(this, "strokeStyle", {
                get: function () { return _context.strokeStyle; },
                set: function (v) { _context.strokeStyle = v; }
            });

            Object.defineProperty(this, "shadowBlur", {
                get: function () { return _context.shadowBlur; },
                set: function (v) { _context.shadowBlur = v; }
            });

            Object.defineProperty(this, "shadowColor", {
                get: function () { return _context.shadowColor; },
                set: function (v) { _context.shadowColor = v; }
            });

            Object.defineProperty(this, "shadowOffsetX", {
                get: function () { return _context.shadowOffsetX; },
                set: function (v) { _context.shadowOffsetX = v; }
            });

            Object.defineProperty(this, "shadowOffsetY", {
                get: function () { return _context.shadowOffsetY; },
                set: function (v) { _context.shadowOffsetY = v; }
            });


            // gradients, pattern

            Object.defineProperty(this, "createLinearGradient", {
                value: function (x0, y0, x1, y1) { return _context.createLinearGradient(x0, y0, x1, y1); }
            });

            Object.defineProperty(this, "createRadialGradient", {
                value: function (x0, y0, r0, x1, y1, r1) { return _context.createRadialGradient(x0, y0, r0, x1, y1, r1); }
            });

            Object.defineProperty(this, "createPattern", {
                value: function (image, repetition) { return _context.createPattern(image, repetition); }
            });



            // line style

            Object.defineProperty(this, "lineCap", {
                get: function () { return _context.lineCap; },
                set: function (v) { _context.lineCap = v; }
            });

            Object.defineProperty(this, "lineJoin", {
                get: function () { return _context.lineJoin; },
                set: function (v) { _context.lineJoin = v; }
            });

            Object.defineProperty(this, "lineWidth", {
                get: function () { return _context.lineWidth; },
                set: function (v) { _context.lineWidth = v; }
            });

            Object.defineProperty(this, "miterLimit", {
                get: function () { return _context.miterLimit; },
                set: function (v) { _context.miterLimit = v; }
            });

            Object.defineProperty(this, "getLineDash", {
                value: function () { _context.getLineDash(); }
            });

            Object.defineProperty(this, "setLineDash", {
                value: function (segments) { _context.setLineDash(segments); }
            });

            Object.defineProperty(this, "lineDashOffset", {
                get: function () { return _context.lineDashOffset; },
                set: function (v) { _context.lineDashOffset = v; }
            });


            // text style

            Object.defineProperty(this, "fontSize", {
                get: function () { return _fontSize; },
                set: function (v) {
                    _fontSize = v;
                    _context.font = _fontSize + "px " + _fontFamily;
                }
            });

            Object.defineProperty(this, "fontFamily", {
                get: function () { return _fontFamily; },
                set: function (v) {
                    _fontFamily = v;
                    _context.font = _fontSize + "px " + _fontFamily;
                }
            });

            Object.defineProperty(this, "textAlign", {
                get: function () { return _context.textAlign; },
                set: function (v) {
                    _context.textAlign = v;
                }
            });

            Object.defineProperty(this, "textBaseline", {
                get: function () { return _context.textBaseline; },
                set: function (v) {
                    _context.textBaseline = v;
                }
            });

            Object.defineProperty(this, "direction", {
                get: function () {
                    if (_supportTextDirection) {
                        return _context.direction;
                    } else {
                        return _defaultValues.direction;
                    }
                },
                set: function (v) {
                    if (_supportTextDirection) {
                        _context.direction = v;
                    } else {
                        console.log("unsupported property 'direction'");
                    }
                }
            });


            // context

            this.saveState = function () {
                _context.save();
            };

            this.restoreState = function () {
                _context.restore();
            };

            this.toDataURL = function (optType, optParameter) {
                _context.toDataURL(optType, optParameter);
            };


            // clear, stroke, fill, clip

            this.clearRect = function (x, y, w, h, optFillStyle) {
                if (typeof optFillStyle === "undefined" || optFillStyle === null) {
                    _context.clearRect(x, y, w, h);
                } else {
                    _context.fillStyle = optFillStyle;
                    _context.fillRect(x, y, w, h);
                }
            };

            this.strokeRect = function (x, y, width, height) {
                _context.strokeRect(x, y, width, height);
            };

            this.fillRect = function (x, y, width, height) {
                _context.fillRect(x, y, width, height);
            };

            this.stroke = function () {
                _context.stroke();
            };

            this.fill = function (optFillRule) {
                _context.fill(optFillRule);
            };

            this.strokePath2D = function (path2D) {
                _context.stroke(path2D);
            };

            this.fillPath2D = function (path2D, optFillRule) {
                optFillRule = optFillRule || "nonzero";
                _context.fill(path2D, optFillRule);
            };

            this.clip = function () {
                _context.clip();
            };


            // shapes

            this.rect = function (x, y, w, h) {
                _context.rect(x, y, w, h);
            };

            this.square = function (x, y, size) {
                _context.rect(x, y, size, size);
            };

            this.ellipse = function (x, y, rx, ry, otpRotation, optStartAngle, optEndAngle) {
                if (_supportEllipseDrawing) {
                    otpRotation = otpRotation || 0;
                    optStartAngle = optStartAngle || 0;
                    optEndAngle = optEndAngle || 2 * Math.PI;
                    _context.ellipse(x, y, rx, ry, otpRotation, optStartAngle, optEndAngle);
                }
                else {
                    // ellipse polyfill
                    ellipsePath(x, y, rx, ry, otpRotation, optStartAngle, optEndAngle);
                }
            };

            this.circle = function (x, y, r) {
                if (_supportEllipseDrawing) {
                    _context.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
                }
                else {
                    _context.arc(x, y, radius, 0, 2 * Math.PI, false);
                }
            };

            this.arc = function (x, y, radius, startAngle, endAngle, optAnticlockwise) {
                _context.arc(x, y, radius, startAngle, endAngle, !!optAnticlockwise);
            };


            // path

            this.beginPath = function () {
                _context.beginPath();
            };

            this.closePath = function () {
                _context.closePath();
            };

            this.arcTo = function (x1, y1, x2, y2, radius) {
                _context.arcTo(x1, y1, x2, y2, radius);
            };

            this.moveTo = function (x, y) {
                _context.moveTo(x, y);
            };

            this.lineTo = function (x, y) {
                _context.lineTo(x, y);
            };

            this.bezierCurveTo = function (c1x, c1y, c2x, c2y, x, y) {
                _context.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
            };

            this.quadraticCurveTo = function (cx, cy, x, y) {
                _context.quadraticCurveTo(cx, cy, x, y);
            };


            // hit testing

            this.isPointInPath = function (x, y, optFillRule) {
                return _context.isPointInPath(x, y, optFillRule);
            };

            this.isPointInPath2D = function (path2D, x, y, optFillRule) {
                return _context.isPointInPath(path2D, x, y, optFillRule);
            };

            this.isPointInStroke = function (x, y) {
                return _context.isPointInStroke(x, y);
            };

            this.isPointInPath2DStroke = function (path2D, x, y) {
                return _context.isPointInStroke(path2D, x, y);
            };

            this.addHitRegion = function (options) {
                if (_supportAddHitRegion) {
                    return _context.addHitRegion(options);
                } else {
                    console.log("unsupported function 'addHitRegion'");
                    return 0;
                }
            };

            this.removeHitRegion = function (id) {
                if (_supportRemoveHitRegion) {
                    _context.removeHitRegion(id);
                } else {
                    console.log("unsupported function 'removeHitRegion'");
                }
            };

            this.clearHitRegions = function () {
                if (_supportClearHitRegion) {
                    _context.clearHitRegions();
                } else {
                    console.log("unsupported function 'clearHitRegions'");
                }
            };


            // image, imageData

            this.drawImage = function (img, dx, dy, dw, dh, sx, sy, sw, sh) {
                if (typeof dw === "undefined") {
                    _context.drawImage(img, dx, dy);
                }
                else if (typeof sx === "undefined") {
                    _context.drawImage(img, dx, dy, dw, dh);
                }
                else {
                    _context.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh);
                }
            };

            this.createImageData = function (width, height) {
                return _context.createImageData(width, height);
            };

            this.cloneImageData = function (imageData) {
                return _context.cloneImageData(imageData);
            };

            this.getImageData = function (sx, sy, sw, sh) {
                sx = sx || 0;
                sy = sy || 0;
                sw = sw || _context.canvas.width;
                sh = sh || _context.canvas.height;
                return _context.getImageData(sx, sy, sw, sh);
            };

            this.putImageData = function (imageData, x, y) {
                _context.putImageData(imageData, x, y);
            };

            Object.defineProperty(this, "imageSmoothingEnabled", {
                get: function () {
                    return _context.mozImageSmoothingEnabled || _context.webkitImageSmoothingEnabled || _context.msImageSmoothingEnabled || _context.imageSmoothingEnabled;
                },
                set: function (v) {
                    _context.mozImageSmoothingEnabled = v;
                    _context.webkitImageSmoothingEnabled = v;
                    _context.msImageSmoothingEnabled = v;
                    _context.imageSmoothingEnabled = v;
                }
            });


            // text

            this.fillText = function (text, x, y, optMaxWidth) {
                _context.fillText(text, x, y, optMaxWidth);
                //return _context.measureText(text);
            };

            this.strokeText = function (text, x, y, optMaxWidth) {
                _context.strokeText(text, x, y, optMaxWidth);
                //return _context.measureText(text);
            };

            this.measureText = function (text) {
                return _context.measureText(text);
            };


            // transformations

            this.rotate = function (angle) {
                _context.rotate(angle);
            };

            this.translate = function (dx, dy) {
                _context.translate(dx, dy);
            };

            this.scale = function (x, y) {
                _context.scale(x, y);
            };

            this.transform = function (a, b, c, d, e, f) {
                _context.transform(a, b, c, d, e, f);
            };

            this.setTransform = function (a, b, c, d, e, f) {
                _context.setTransform(a, b, c, d, e, f);
            };

            this.resetTransform = function () {
                _context.setTransform(1, 0, 0, 1, 0, 0);
            };


            // misc

            this.drawFocusIfNeeded = function (button) {
                _context.drawFocusIfNeeded(button);
            };


            _init();
        }

        CanvasRenderer.prototype = Object.create(lib.Cgx.Renderer.prototype);
        CanvasRenderer.prototype.constructor = CanvasRenderer;

        return CanvasRenderer;

    })();
    lib.Cgx.CanvasRenderer = CanvasRenderer;

})(library);