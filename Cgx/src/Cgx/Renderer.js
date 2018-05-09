
(function (lib) {

    var Renderer = (function () {

        function Renderer(canvas) {

            var _self = this;
            var _canvas = canvas;


            function throwAbstractMemberCallError() {
                throw new Error("abstract member call");
            }



            Object.defineProperty(this, "name", {
                configurable: true,
                value: "Renderer"
            });

            Object.defineProperty(this, "canvas", {
                get: function () {
                    return _canvas;
                }
            });


            // compositing

            Object.defineProperty(this, "globalAlpha", {
                configurable: true,
                value: 1.0
            });

            Object.defineProperty(this, "globalCompositeOperation", {
                configurable: true,
                value: "source-over"
            });


            // colors, styles, shadows

            Object.defineProperty(this, "fillStyle", {
                configurable: true,
                value: "#000"
            });

            Object.defineProperty(this, "strokeStyle", {
                configurable: true,
                value: "#000"
            });

            Object.defineProperty(this, "shadowBlur", {
                configurable: true,
                value: 0.0
            });

            Object.defineProperty(this, "shadowColor", {
                configurable: true,
                value: "#000"
            });

            Object.defineProperty(this, "shadowOffsetX", {
                configurable: true,
                value: 0.0
            });

            Object.defineProperty(this, "shadowOffsetY", {
                configurable: true,
                value: 0.0
            });


            // gradients, pattern

            Object.defineProperty(this, "createLinearGradient", {
                configurable: true,
                value: function (x0, y0, x1, y1) { throwAbstractMemberCallError(); }
            });

            Object.defineProperty(this, "createRadialGradient", {
                configurable: true,
                value: function (x0, y0, r0, x1, y1, r1) { throwAbstractMemberCallError(); }
            });

            Object.defineProperty(this, "createPattern", {
                configurable: true,
                value: function (image, repetition) { throwAbstractMemberCallError(); }
            });



            // line style

            Object.defineProperty(this, "lineCap", {
                configurable: true,
                value: "butt"
            });

            Object.defineProperty(this, "lineJoin", {
                configurable: true,
                value: "miter"
            });

            Object.defineProperty(this, "lineWidth", {
                configurable: true,
                value: 1.0
            });

            Object.defineProperty(this, "miterLimit", {
                configurable: true,
                value: 10.0
            });

            Object.defineProperty(this, "getLineDash", {
                configurable: true,
                value: function () { throwAbstractMemberCallError(); }
            });

            Object.defineProperty(this, "setLineDash", {
                configurable: true,
                value: function (segments) { throwAbstractMemberCallError(); }
            });

            Object.defineProperty(this, "lineDashOffset", {
                configurable: true,
                value: 0.0
            });


            // text style

            Object.defineProperty(this, "fontSize", {
                configurable: true,
                value: 16
            });

            Object.defineProperty(this, "fontFamily", {
                configurable: true,
                value: "Arial"
            });

            Object.defineProperty(this, "textAlign", {
                configurable: true,
                value: "left"
            });

            Object.defineProperty(this, "textBaseline", {
                configurable: true,
                value: "bottom"
            });

            Object.defineProperty(this, "direction", {
                configurable: true,
                value: "rtl"
            });


            // context

            this.saveState = function () { throwAbstractMemberCallError(); };

            this.restoreState = function () { throwAbstractMemberCallError(); };

            this.toDataURL = function (optType, optParameter) { throwAbstractMemberCallError(); };


            // clear, stroke, fill, clip

            this.clearRect = function (x, y, w, h, optFillStyle) { throwAbstractMemberCallError(); };

            this.strokeRect = function (x, y, width, height) { throwAbstractMemberCallError(); };

            this.fillRect = function (x, y, width, height) { throwAbstractMemberCallError(); };

            this.stroke = function () { throwAbstractMemberCallError(); };

            this.fill = function (optFillRule) { throwAbstractMemberCallError(); };

            this.strokePath2D = function (path2D) { throwAbstractMemberCallError(); };

            this.fillPath2D = function (path2D, optFillRule) { throwAbstractMemberCallError(); };

            this.clip = function () { throwAbstractMemberCallError(); };


            // shapes

            this.rect = function (x, y, w, h) { throwAbstractMemberCallError(); };

            this.square = function (x, y, size) { throwAbstractMemberCallError(); };

            this.ellipse = function (x, y, rx, ry, otpRotation, optStartAngle, optEndAngle) { throwAbstractMemberCallError(); };

            this.circle = function (x, y, r) { throwAbstractMemberCallError(); };

            this.arc = function (x, y, radius, startAngle, endAngle, optAnticlockwise) { throwAbstractMemberCallError(); };


            // path

            this.beginPath = function () { throwAbstractMemberCallError(); };

            this.closePath = function () { throwAbstractMemberCallError(); };

            this.arcTo = function (x1, y1, x2, y2, radius) { throwAbstractMemberCallError(); };

            this.moveTo = function (x, y) { throwAbstractMemberCallError(); };

            this.lineTo = function (x, y) { throwAbstractMemberCallError(); };

            this.bezierCurveTo = function (c1x, c1y, c2x, c2y, x, y) { throwAbstractMemberCallError(); };

            this.quadraticCurveTo = function (cx, cy, x, y) { throwAbstractMemberCallError(); };


            // hit testing

            this.isPointInPath = function (x, y, optFillRule) { throwAbstractMemberCallError(); };

            this.isPointInPath2D = function (path2D, x, y, optFillRule) { throwAbstractMemberCallError(); };

            this.isPointInStroke = function (x, y) { throwAbstractMemberCallError(); };

            this.isPointInPath2DStroke = function (path2D, x, y) { throwAbstractMemberCallError(); };

            this.addHitRegion = function (options) { throwAbstractMemberCallError(); };

            this.removeHitRegion = function (id) { throwAbstractMemberCallError(); };

            this.clearHitRegions = function () { throwAbstractMemberCallError(); };



            // image, imageData

            this.drawImage = function (img, dx, dy, dw, dh, sx, sy, sw, sh) { throwAbstractMemberCallError(); };

            this.createImageData = function (width, height) { throwAbstractMemberCallError(); };

            this.cloneImageData = function (imageData) { throwAbstractMemberCallError(); };

            this.getImageData = function (sx, sy, sw, sh) { throwAbstractMemberCallError(); };

            this.putImageData = function (imageData, x, y) { throwAbstractMemberCallError(); };

            Object.defineProperty(this, "imageSmoothingEnabled", {
                configurable: true,
                value: true
            });


            // text

            this.fillText = function (text, x, y, optMaxWidth) { throwAbstractMemberCallError(); };

            this.strokeText = function (text, x, y, optMaxWidth) { throwAbstractMemberCallError(); };

            this.measureText = function (text) { throwAbstractMemberCallError(); };


            // transformations

            this.rotate = function (angle) { throwAbstractMemberCallError(); };

            this.translate = function (dx, dy) { throwAbstractMemberCallError(); };

            this.scale = function (x, y) { throwAbstractMemberCallError(); };

            this.transform = function (a, b, c, d, e, f) { throwAbstractMemberCallError(); };

            this.setTransform = function (a, b, c, d, e, f) { throwAbstractMemberCallError(); };

            this.resetTransform = function () { throwAbstractMemberCallError(); };


            // misc

            this.drawFocusIfNeeded = function (button) { throwAbstractMemberCallError(); };

        }

        return Renderer;

    })();
    lib.Cgx.Renderer = Renderer;

})(library);