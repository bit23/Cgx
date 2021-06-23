
namespace Cgx {

    export class Transform {

        private _matrix: Matrix;
        private _isDirty = true;
        private _originX = 0.0;
        private _originY = 0.0;
        private _translationX = 0.0;
        private _translationY = 0.0;
        private _scaleX = 1.0;
        private _scaleY = 1.0;
        private _rotation = 0.0;


        protected _propertyChanged: (propertyName: string) => void = (p) => { };


        public get originX() {
            return this._originX;
        }
        public set originX(v: number) {
            if (typeof v === "number") {
                if (this._originX !== v) {
                    this._originX = v;
                    this._isDirty = true;
                    this._propertyChanged("originX");
                }
            }
        }

        public get originY() {
            return this._originY;
        }
        public set originY(v: number) {
            if (typeof v === "number") {
                if (this._originY !== v) {
                    this._originY = v;
                    this._isDirty = true;
                    this._propertyChanged("originY");
                }
            }
        }

        public get translationX() {
            return this._translationX;
        }
        public set translationX(v: number) {
            if (typeof v === "number") {
                if (this._translationX !== v) {
                    this._translationX = v;
                    this._isDirty = true;
                    this._propertyChanged("translationX");
                }
            }
        }

        public get translationY() {
            return this._translationY;
        }
        public set translationY(v: number) {
            if (typeof v === "number") {
                if (this._translationY !== v) {
                    this._translationY = v;
                    this._isDirty = true;
                    this._propertyChanged("translationY");
                }
            }
        }

        public get scaleX() {
            return this._scaleX;
        }
        public set scaleX(v: number) {
            if (typeof v === "number") {
                if (this._scaleX !== v) {
                    this._scaleX = v;
                    this._isDirty = true;
                    this._propertyChanged("scaleX");
                }
            }
        }

        public get scaleY() {
            return this._scaleY;
        }
        public set scaleY(v: number) {
            if (typeof v === "number") {
                if (this._scaleY !== v) {
                    this._scaleY = v;
                    this._isDirty = true;
                    this._propertyChanged("scaleY");
                }
            }
        }

        public get rotation() {
            return this._rotation;
        }
        public set rotation(v: number) {
            if (typeof v === "number") {
                if (this._rotation !== v) {
                    this._rotation = v;
                    this._isDirty = true;
                    this._propertyChanged("rotation");
                }
            }
        }

        public get isIdentity() {
            if (this._translationX == 0 && this._translationY == 0) {
                if (this._scaleX == 1 && this._scaleY == 1) {
                    if (this._rotation == 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        public getMatrix() {
            if (this._matrix == null || this._isDirty) {
                this._matrix = new Matrix();
                this._matrix.translate(this.translationX, this.translationY);
                this._matrix.rotate(this.rotation);
                this._matrix.scale(this.scaleX, this.scaleY);
            }
            return this._matrix;
        }

        public reset() {
            this._originX = 0.0;
            this._originY = 0.0;
            this._translationX = 0.0;
            this._translationY = 0.0;
            this._scaleX = 1.0;
            this._scaleY = 1.0;
            this._rotation = 0.0;
            this._matrix = null;
        }

        public setDirty() {
            this._isDirty = true;
        }

        public transformPoint(x: number, y: number) {
            return this.getMatrix().transformPoint(x, y);
        }

        public transformRect(x: number, y: number, width: number, height: number) {
            return this.getMatrix().transformRect(x, y, width, height);
        }
    }
}