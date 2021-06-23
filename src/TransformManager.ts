
namespace Cgx {

    export class TransformManager {

        private _transforms: Transform[];
        private _renderer: GraphicsRenderer;

        constructor(renderer: GraphicsRenderer) {
            this._transforms = [];
            this._renderer = renderer;
        }

        public push(transform: Transform) {
            var mtx = transform.getMatrix();
            this._transforms.push(transform);
            this._renderer.saveState();
            this._renderer.transform(mtx.m11, mtx.m12, mtx.m21, mtx.m22, mtx.offsetX, mtx.offsetY);
        }

        public pop() {
            var result = this._transforms.push();
            this._renderer.restoreState();
            return result;
        }

        public get length() {
            return this._transforms.length;
        }
    }
}