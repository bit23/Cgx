
/// <reference path="CanvasRenderer.js" />

(function (lib) {

    var Engine = (function () {

        function Engine() {

            var _self = this;
            var _renderers = {};
            var _defaultRendererName;
            var _vars = {};


            function _init() {
                _self.registerRenderer("CanvasRenderer", lib.Cgx.CanvasRenderer);
                //_self.registerRenderer("WebGLRenderer", lib.Cgx.WebGLRenderer);
                _self.defaultRenderer = "CanvasRenderer";
            }


            Object.defineProperty(this, "defaultRenderer", {
                get: function () { return _defaultRendererName; },
                set: function (v) {
                    if (typeof v !== "string")
                        return;
                    if (_defaultRendererName != v) {
                        _defaultRendererName = v;
                    }
                }
            });

            Object.defineProperty(this, "vars", {
                get: function () { return _vars; }
            });


            Object.defineProperty(this, "registerRenderer", {
                value: function (name, rendererConstructor) {
                    // TODO: check rendererConstructor type
                    _renderers[name] = rendererConstructor;
                }
            });

            Object.defineProperty(this, "loadSettings", {
                value: function (settings) {
                    if ("defaultRenderer" in settings) {
                        _defaultRenderer = settings.defaultRenderer;
                    }
                    if ("vars" in settings) {
                        for (var n in settings.vars) {
                            if (settings.vars.hasOwnProperty(n)) {
                                _vars[n] = settings.vars[n];
                            }
                        }
                    }
                }
            });


            Object.defineProperty(this, "createDefaultRenderer", {
                value: function (canvas) { return _self.createRenderer(canvas, _defaultRendererName); }
            });

            Object.defineProperty(this, "createRenderer", {
                value: function (canvas, rendererTypeName) {

                    if (!(rendererTypeName in _renderers)) {
                        console.log("invalid renderer name " + rendererTypeName);
                        rendererTypeName = _defaultRendererName;
                    }

                    var rendererType = _renderers[rendererTypeName];
                    return new rendererType(canvas);

                    //return new lib.Cgx.CanvasRenderer(canvas);
                }
            });


            //https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
            Object.defineProperty(this, "createCanvasBuffer", {
                value: function (optWidth, optHeight) {
                    var canvas = window.document.createElement("canvas");
                    if (typeof optWidth === "number")
                        canvas.width = optWidth;
                    if (typeof optHeight === "number")
                        canvas.height = optHeight;
                    return canvas;
                }
            });

            Object.defineProperty(this, "createBufferedGraphics", {
                value: function (width, height) {
                    var canvas = _self.createCanvasBuffer(width, height);
                    return new lib.Cgx.CoreGraphics(canvas);
                }
            });


            _init();
        }

        return new Engine();

    })();
    lib.Cgx.Engine = Engine;

})(library);