
/// <reference path="CoreGraphics.ts" />

namespace Cgx {

    export class BufferedGraphics extends CoreGraphics {

        constructor(target: GraphicsTarget) {
            super(target);
        }

        public commitTo(canvas: HTMLCanvasElement): void;
        public commitTo(bitmapRenderer: ImageBitmapRenderingContext): void;
        public commitTo(canvasOrBitmapRenderer: HTMLCanvasElement | ImageBitmapRenderingContext): void {
            let bitmap = (<OffscreenCanvas>this.canvasBuffer).transferToImageBitmap();
            let bitmapRenderer: ImageBitmapRenderingContext;
            if (canvasOrBitmapRenderer instanceof HTMLCanvasElement) {
                bitmapRenderer = canvasOrBitmapRenderer.getContext("bitmaprenderer");
            } else {
                bitmapRenderer = canvasOrBitmapRenderer;
            }
            bitmapRenderer.transferFromImageBitmap(bitmap);
        }

        public convertToBlob(type?: string, quality?: any): Promise<Blob> {
            return (<OffscreenCanvas>this.canvasBuffer).convertToBlob({
                type,
                quality
            });
        }

        public convertToObjectURL(type?: string, quality?: any) {
            return this.convertToBlob(type, quality)
                .then(res => {
                    return URL.createObjectURL(res);
                });
        }
    }
}