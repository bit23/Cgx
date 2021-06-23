
namespace Cgx {

    export class Matrix {

        public static readonly indentity = new Matrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);

        private static createRotationRadians(angle: number, centerX: number, centerY: number) {
            var sinAngle = Math.sin(angle);
            var cosAngle = Math.cos(angle);
            var offsetX = (centerX * (1.0 - cosAngle)) + (centerY * sinAngle);
            var offsetY = (centerY * (1.0 - cosAngle)) - (centerX * sinAngle);
            return new Matrix(cosAngle, sinAngle, -sinAngle, cosAngle, offsetX, offsetY);
        }

        private static multiplyRefMatrix(refMatrix: Matrix, matrix: Matrix) {
            var m11 = (refMatrix.m11 * matrix.m11) + (refMatrix.m12 * matrix.m21);
            var m12 = (refMatrix.m11 * matrix.m12) + (refMatrix.m12 * matrix.m22);
            var m21 = (refMatrix.m21 * matrix.m11) + (refMatrix.m22 * matrix.m21);
            var m22 = (refMatrix.m21 * matrix.m12) + (refMatrix.m22 * matrix.m22);
            var m31 = ((refMatrix.offsetX * matrix.m11) + (refMatrix.offsetY * matrix.m21)) + matrix.offsetX;
            var m32 = ((refMatrix.offsetX * matrix.m12) + (refMatrix.offsetY * matrix.m22)) + matrix.offsetY;
            refMatrix.m11 = m11;
            refMatrix.m12 = m12;
            refMatrix.m21 = m21;
            refMatrix.m22 = m22;
            refMatrix.offsetX = m31;
            refMatrix.offsetY = m32;
        }

        public static invert(matrix: Matrix) {
            var determinant = (matrix.m11 * matrix.m22) - (matrix.m21 * matrix.m12);
            if (Math.abs(determinant) < 1.401298E-45) {
                return new Matrix(Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN);
            }
            var inverseDeterminant = 1.0 / determinant;
            var m11 = matrix.m22 * inverseDeterminant;
            var m12 = -matrix.m12 * inverseDeterminant;
            var m21 = -matrix.m21 * inverseDeterminant;
            var m22 = matrix.m11 * inverseDeterminant;
            var m31 = ((matrix.m21 * matrix.offsetY) - (matrix.offsetX * matrix.m22)) * inverseDeterminant;
            var m32 = ((matrix.offsetX * matrix.m12) - (matrix.m11 * matrix.offsetY)) * inverseDeterminant;
            return new Matrix(m11, m12, m21, m22, m31, m32);
        }

        public static multiplyMatrix(matrix1: Matrix, matrix2: Matrix) {
            var m11 = (matrix1.m11 * matrix2.m11) + (matrix1.m12 * matrix2.m21);
            var m12 = (matrix1.m11 * matrix2.m12) + (matrix1.m12 * matrix2.m22);
            var m21 = (matrix1.m21 * matrix2.m11) + (matrix1.m22 * matrix2.m21);
            var m22 = (matrix1.m21 * matrix2.m12) + (matrix1.m22 * matrix2.m22);
            var m31 = ((matrix1.offsetX * matrix2.m11) + (matrix1.offsetY * matrix2.m21)) + matrix2.offsetX;
            var m32 = ((matrix1.offsetX * matrix2.m12) + (matrix1.offsetY * matrix2.m22)) + matrix2.offsetY;
            return new Matrix(m11, m12, m21, m22, m31, m32);
        }

        public static multiplyValue(matrix: Matrix, value: number) {
            var m11 = matrix.m11 * value;
            var m12 = matrix.m12 * value;
            var m21 = matrix.m21 * value;
            var m22 = matrix.m22 * value;
            var m31 = matrix.offsetX * value;
            var m32 = matrix.offsetY * value;
            return new Matrix(m11, m12, m21, m22, m31, m32);
        }


        constructor(m11?: number, m12?: number, m21?: number, m22?: number, offsetX?: number, offsetY?: number) {
            this.m11 = m11 || 1.0;
            this.m12 = m12 || 0.0;
            this.m21 = m21 || 0.0;
            this.m22 = m22 || 1.0;
            this.offsetX = offsetX || 0.0;
            this.offsetY = offsetY || 0.0;
        }


        private isZero(value: number) {
            return (Math.abs(value) < 2.2204460492503131E-15);
        }

        private multiplyPoint(x: number, y: number): Point {
            var ox = (y * this.m21) + this.offsetX;
            var oy = (x * this.m12) + this.offsetY;
            x *= this.m11;
            x += ox;
            y *= this.m22;
            y += oy;
            return { x: x, y: y };
        }

        private getDeterminant() {
            return ((this.m11 * this.m22) - (this.m21 * this.m12));
        }


        public m11: number;
        public m12: number;
        public m21: number;
        public m22: number;
        public offsetX: number;
        public offsetY: number;

        public clone() {
            return new Matrix(this.m11, this.m12, this.m21, this.m22, this.offsetX, this.offsetY);
        }

        public hasInverse() {
            return !this.isZero(this.getDeterminant());
        }

        public isIdentity() {
            return (this.m11 == 1.0 && this.m12 == 0.0 && this.m21 == 0.0 && this.m22 == 1.0 && this.offsetX == 0.0 && this.offsetY == 0.0);
        }

        public reset() {
            this.m11 = 1.0;
            this.m12 = 0.0;
            this.m21 = 0.0;
            this.m22 = 1.0;
            this.offsetX = 0.0;
            this.offsetY = 0.0;
        }

        public rotate(angle: number) {
            angle = angle % 360.0;
            var rotationMatrix = Matrix.createRotationRadians(angle * 0.017453292519943295, 0.0, 0.0);
            Matrix.multiplyRefMatrix(this, rotationMatrix);
        }

        public rotateAt(angle: number, centerX: number, centerY: number) {
            angle = angle % 360.0;
            var rotationMatrix = Matrix.createRotationRadians(angle * 0.017453292519943295, centerX, centerY);
            Matrix.multiplyRefMatrix(this, rotationMatrix);
        }

        public scale(scaleX: number, scaleY: number) {
            var scaleMatrix = new Matrix(scaleX, 0.0, 0.0, scaleY, 0.0, 0.0);
            Matrix.multiplyRefMatrix(this, scaleMatrix);
        }

        public scaleAt(scaleX: number, scaleY: number, centerX: number, centerY: number) {
            var scaleAtMatrix = new Matrix(scaleX, 0.0, 0.0, scaleY, centerX - (scaleX * centerX), centerY - (scaleY * centerY));
            Matrix.multiplyRefMatrix(this, scaleAtMatrix);
        }

        public skew(skewX: number, skewY: number) {
            skewX = (skewX % 360.0) * 0.017453292519943295;
            skewY = (skewY % 360.0) * 0.017453292519943295;
            var skewMatrix = new Matrix(1.0, Math.tan(skewY), Math.tan(skewX), 1.0, 0.0, 0.0);
            Matrix.multiplyRefMatrix(this, skewMatrix);
        }

        public transformPoint(x: number, y: number) {
            return this.multiplyPoint(x, y);
        }

        public transformRect(x: number, y: number, width: number, height: number) {
            var endX = x + width;
            var endY = y + height;
            var start = this.multiplyPoint(x, y);
            var end = this.multiplyPoint(endX, endY);
            var lx, ly, lw, lh;
            lx = start.x;
            ly = start.y;
            lw = end.x - lx;
            lh = end.y - ly;
            return { x: lx, y: ly, width: lw, height: lh };
        }

        public translate(offsetX: number, offsetY: number) {
            this.offsetX += offsetX;
            this.offsetY += offsetY;
        }
    }
}