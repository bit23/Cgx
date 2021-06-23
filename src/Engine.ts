
namespace Cgx {

    export interface EngineSupport {
        readonly imageBitmapRenderingContext: boolean;
        readonly offscreenCanvas: boolean;
        readonly offscreenCanvasTransferToImageBitmap: boolean;
        readonly bufferedGraphics: boolean;
    }

    export interface EngineSettings {
        defaultRenderer: string;
        vars: { [name: string]: any }
    }

    export class Engine {

        public static readonly support: EngineSupport = (() => {
            const imageBitmapRenderingContext = "ImageBitmapRenderingContext" in window;
            const offscreenCanvas = "OffscreenCanvas" in window;
            const offscreenCanvasTransferToImageBitmap = offscreenCanvas && "transferToImageBitmap" in OffscreenCanvas.prototype;
            return {
                imageBitmapRenderingContext: imageBitmapRenderingContext,
                offscreenCanvas: offscreenCanvas,
                offscreenCanvasTransferToImageBitmap: offscreenCanvasTransferToImageBitmap,
                bufferedGraphics: offscreenCanvas && offscreenCanvasTransferToImageBitmap
            };
        })();

        private static _renderers: Array<[string, new (canvasSurface: CanvasSurface) => GraphicsRenderer]> = [];
        private static _defaultRendererName: string;
        private static _defaultRendererType: new (canvasSurface: CanvasSurface) => GraphicsRenderer;
        private static _vars: { [name: string]: any } = {}

        // https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
        private static createOffscreenCanvas(width: number = 256, height: number = 256) {
            if (Engine.support.offscreenCanvas) {
                const offscreen = new OffscreenCanvas(width, height);
                return offscreen;
            }
            else {
                return this.createCanvas(width, height);
            }
        }

        

        private static createRenderer(canvasSurface: CanvasSurface, rendererTypeName: string): GraphicsRenderer {
            let rendererType = this.getRendererType(rendererTypeName);
            return new rendererType(canvasSurface);
        }

        private static getRendererType(typeName: string): new (canvasSurface: CanvasSurface) => GraphicsRenderer {

            if (this._renderers.length == 0) {
                throw new Error("no renderers registered");
            }

            var rendererEntry = this._renderers.filter(v => v[0] === typeName)[0];
            if (!rendererEntry) {
                console.error("invalid renderer name " + typeName);
                typeName = this._defaultRendererName;
                rendererEntry = this._renderers.filter(v => v[0] === typeName)[0];
                return this._defaultRendererType;
            }
            return rendererEntry[1];
        }


        public static createCanvas(width: number = 256, height: number = 256) {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            return canvas;
        }

        public static get defaultRenderer() { return this._defaultRendererName; };
        public static set defaultRenderer(v) {
            if (typeof v !== "string")
                return;
            if (this._defaultRendererName != v) {
                this._defaultRendererName = v;
            }
        }

        public static get vars() { return this._vars; };

        public static registerRenderer(name: string, rendererBuilder: new (canvas: HTMLCanvasElement) => GraphicsRenderer) {
            // TODO: check rendererConstructor type
            var rendererEntry = this._renderers.filter(v => v[0] === name)[0];
            if (rendererEntry) {
                rendererEntry[1] = rendererBuilder;
            } else {
                this._renderers.push([
                    name,
                    rendererBuilder
                ]);
                if (this._renderers.length == 1 && !this._defaultRendererName) {
                    this._defaultRendererName = this._renderers[0][0];
                    this._defaultRendererType = this._renderers[0][1];
                }
            }
        }

        public static loadSettings(settings: EngineSettings) {
            if ("defaultRenderer" in settings) {
                this._defaultRendererName = settings.defaultRenderer;
            }
            if ("vars" in settings) {
                for (var n in settings.vars) {
                    if (settings.vars.hasOwnProperty(n)) {
                        this._vars[n] = settings.vars[n];
                    }
                }
            }
        }

        public static createDefaultRenderer(canvasSurface: CanvasSurface): GraphicsRenderer {
            if (!this._defaultRendererType)
                throw new Error("no default renderer registered");
            return new this._defaultRendererType(canvasSurface);
        }


        public static createGraphicsFromCanvasSurface(canvasSurface: CanvasSurface, rendererTypeName?: string): CoreGraphics {
            let renderer: GraphicsRenderer;
            if (typeof rendererTypeName === "string") {
                renderer = this.createRenderer(canvasSurface, rendererTypeName);
            } else {
                renderer = this.createDefaultRenderer(canvasSurface);
            }
            return new CoreGraphics(renderer);
        }

        public static createGraphics(width: number, height: number, rendererTypeName?: string): CoreGraphics {
            const canvas = this.createCanvas(width, height);
            return this.createGraphicsFromCanvasSurface(canvas, rendererTypeName);
        }

        public static createOffscreenGraphics(width: number, height: number, rendererTypeName?: string): CoreGraphics {
            let canvasSurface = this.createOffscreenCanvas(width, height);
            return this.createGraphicsFromCanvasSurface(canvasSurface);
        }

        public static createBufferedGraphics(width: number, height: number, rendererTypeName?: string): BufferedGraphics {
            if (Engine.support.bufferedGraphics) {
                let canvasSurface = this.createOffscreenCanvas(width, height);
                let renderer: GraphicsRenderer;
                if (typeof rendererTypeName === "string") {
                    renderer = this.createRenderer(canvasSurface, rendererTypeName);
                } else {
                    renderer = this.createDefaultRenderer(canvasSurface);
                }
                return new BufferedGraphics(renderer);
            }
            else {
                console.log("unsupported feature 'bufferedGraphics'");
            }
        }
    }

    (function () {
        Engine.registerRenderer("CanvasRenderer", CanvasRenderer);
        //Engine.registerRenderer("WebGLRenderer", WebGLRenderer);
    })();
}
