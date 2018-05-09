
(function (lib) {

    var Matrix = (function () {


        function Matrix(m11, m12, m21, m22, offsetX, offsetY) {

            var _self = this;

            function isZero(value) {
                return (Math.abs(value) < 2.2204460492503131E-15);
            }

            function multiplyPoint(x, y) {
                var ox = (y * _self.m21) + _self.offsetX;
                var oy = (x * _self.m12) + _self.offsetY;
                x *= _self.m11;
                x += ox;
                y *= _self.m22;
                y += oy;
                return { x: x, y: y };
            }

            function getDeterminant() {
                return ((_self.m11 * _self.m22) - (_self.m21 * _self.m12));
            }

            function clone() {
                return new Matrix(_self.m11, _self.m12, _self.m21, _self.m22, _self.offsetX, _self.offsetY);
            }

            function hasInverse() {
                return !isZero(getDeterminant());
            }

            function isIdentity() {
                return (_self.m11 == 1.0 && _self.m12 == 0.0 && _self.m21 == 0.0 && _self.m22 == 1.0 && _self.offsetX == 0.0 && _self.offsetY == 0.0);
            }

            function reset() {
                _self.m11 = 1.0;
                _self.m12 = 0.0;
                _self.m21 = 0.0;
                _self.m22 = 1.0;
                _self.offsetX = 0.0;
                _self.offsetY = 0.0;
            }

            function rotate(angle) {
                angle = angle % 360.0;
                var rotationMatrix = createRotationRadians(angle * 0.017453292519943295, 0.0, 0.0);
                multiplyRefMatrix(_self, rotationMatrix);
            }

            function rotateAt(angle, centerX, centerY) {
                angle = angle % 360.0;
                var rotationMatrix = createRotationRadians(angle * 0.017453292519943295, centerX, centerY);
                multiplyRefMatrix(_self, rotationMatrix);
            }

            function scale(scaleX, scaleY) {
                var scaleMatrix = new Matrix(scaleX, 0.0, 0.0, scaleY, 0.0, 0.0);
                multiplyRefMatrix(_self, scaleMatrix);
            }

            function scaleAt(scaleX, scaleY, centerX, centerY) {
                var scaleAtMatrix = new Matrix(scaleX, 0.0, 0.0, scaleY, centerX - (scaleX * centerX), centerY - (scaleY * centerY));
                multiplyRefMatrix(_self, scaleAtMatrix);
            }

            function skew(skewX, skewY) {
                skewX = (skewX % 360.0) * 0.017453292519943295;
                skewY = (skewY % 360.0) * 0.017453292519943295;
                var skewMatrix = new Matrix(1.0, Math.tan(skewY), Math.tan(skewX), 1.0, 0.0, 0.0);
                multiplyRefMatrix(_self, skewMatrix);
            }

            function transformPoint(x, y) {
                return multiplyPoint(x, y);
            }

            function transformRect(x, y, width, height) {
                var endX = x + width;
                var endY = y + height;
                var start = multiplyPoint(x, y);
                var end = multiplyPoint(endX, endY);
                var lx, ly, lw, lh;
                lx = start.x;
                ly = start.y;
                lw = end.x - lx;
                lh = end.y - ly;
                return { x: lx, y: ly, width: lw, height: lh };
            }

            function translate(offsetX, offsetY) {
                _self.offsetX += offsetX;
                _self.offsetY += offsetY;
            }



            Object.defineProperty(this, "m11", { value: m11 || 1.0, configurable: false, writable: true });
            Object.defineProperty(this, "m12", { value: m12 || 0.0, configurable: false, writable: true });
            Object.defineProperty(this, "m21", { value: m21 || 0.0, configurable: false, writable: true });
            Object.defineProperty(this, "m22", { value: m22 || 1.0, configurable: false, writable: true });
            Object.defineProperty(this, "offsetX", { value: offsetX || 0.0, configurable: false, writable: true });
            Object.defineProperty(this, "offsetY", { value: offsetY || 0.0, configurable: false, writable: true });

            Object.defineProperty(this, "clone", { value: clone });
            Object.defineProperty(this, "hasInverse", { value: hasInverse });
            Object.defineProperty(this, "isIdentity", { value: isIdentity });
            Object.defineProperty(this, "reset", { value: reset });
            Object.defineProperty(this, "rotate", { value: rotate });
            Object.defineProperty(this, "rotateAt", { value: rotateAt });
            Object.defineProperty(this, "scale", { value: scale });
            Object.defineProperty(this, "scaleAt", { value: scaleAt });
            Object.defineProperty(this, "skew", { value: skew });
            Object.defineProperty(this, "transformPoint", { value: transformPoint });
            Object.defineProperty(this, "transformRect", { value: transformRect });
            Object.defineProperty(this, "translate", { value: translate });

        }


        //#region static members

        function createRotationRadians(angle, centerX, centerY) {
            var sinAngle = Math.sin(angle);
            var cosAngle = Math.cos(angle);
            var offsetX = (centerX * (1.0 - cosAngle)) + (centerY * sinAngle);
            var offsetY = (centerY * (1.0 - cosAngle)) - (centerX * sinAngle);
            return new Matrix(cosAngle, sinAngle, -sinAngle, cosAngle, offsetX, offsetY);
        }

        function multiplyRefMatrix(refMatrix, matrix) {
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

        function invert(matrix) {
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

        function multiplyMatrix(matrix1, matrix2) {
            var m11 = (matrix1.m11 * matrix2.m11) + (matrix1.m12 * matrix2.m21);
            var m12 = (matrix1.m11 * matrix2.m12) + (matrix1.m12 * matrix2.m22);
            var m21 = (matrix1.m21 * matrix2.m11) + (matrix1.m22 * matrix2.m21);
            var m22 = (matrix1.m21 * matrix2.m12) + (matrix1.m22 * matrix2.m22);
            var m31 = ((matrix1.offsetX * matrix2.m11) + (matrix1.offsetY * matrix2.m21)) + matrix2.offsetX;
            var m32 = ((matrix1.offsetX * matrix2.m12) + (matrix1.offsetY * matrix2.m22)) + matrix2.offsetY;
            return new Matrix(m11, m12, m21, m22, m31, m32);
        }

        function multiplyValue(matrix, value) {
            var m11 = matrix.m11 * value;
            var m12 = matrix.m12 * value;
            var m21 = matrix.m21 * value;
            var m22 = matrix.m22 * value;
            var m31 = matrix.offsetX * value;
            var m32 = matrix.offsetY * value;
            return new Matrix(m11, m12, m21, m22, m31, m32);
        }


        Object.defineProperty(Matrix, "identity", { value: new Matrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) });
        Object.defineProperty(Matrix, "invert", { value: invert });
        Object.defineProperty(Matrix, "multiplyMatrix", { value: multiplyMatrix });
        Object.defineProperty(Matrix, "multiplyValue", { value: multiplyValue });


        //#endregion


        return Matrix;
    })();
    lib.Cgx.Matrix = Matrix;

})(library);