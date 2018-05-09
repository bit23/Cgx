/// <reference path="Matrix.js" />

(function (lib) {

    var Transform = (function () {

        function Transform() {

            var _self = this;
            var _matrix = null;
            var _isDirty = true;
            var _originX = 0.0;
            var _originY = 0.0;
            var _translationX = 0.0;
            var _translationY = 0.0;
            var _scaleX = 1.0;
            var _scaleY = 1.0;
            var _rotation = 0.0;


            Object.defineProperty(this, "_propertyChanged", {
                enumerable: false,
                configurable: true,
                value: function (propertyName) {
                }
            });

            Object.defineProperty(this, "originX", {
                get: function () { return _originX; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_originX !== v) {
                            _originX = v;
                            _isDirty = true;
                            _self._propertyChanged("originX");
                        }
                    }
                }
            });

            Object.defineProperty(this, "originY", {
                get: function () { return _originY; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_originY !== v) {
                            _originY = v;
                            _isDirty = true;
                            _self._propertyChanged("originY");
                        }
                    }
                }
            });


            Object.defineProperty(this, "translationX", {
                get: function () { return _translationX; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_translationX !== v) {
                            _translationX = v;
                            _isDirty = true;
                            _self._propertyChanged("translationX");
                        }
                    }
                }
            });

            Object.defineProperty(this, "translationY", {
                get: function () { return _translationY; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_translationY !== v) {
                            _translationY = v;
                            _isDirty = true;
                            _self._propertyChanged("translationY");
                        }
                    }
                }
            });


            Object.defineProperty(this, "scaleX", {
                get: function () { return _scaleX; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_scaleX !== v) {
                            _scaleX = v;
                            _isDirty = true;
                            _self._propertyChanged("scaleX");
                        }
                    }
                }
            });

            Object.defineProperty(this, "scaleY", {
                get: function () { return _scaleY; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_scaleY !== v) {
                            _scaleY = v;
                            _isDirty = true;
                            _self._propertyChanged("scaleY");
                        }
                    }
                }
            });


            Object.defineProperty(this, "rotation", {
                get: function () { return _rotation; },
                set: function (v) {
                    if (typeof v === "number") {
                        if (_rotation !== v) {
                            _rotation = v;
                            _isDirty = true;
                            _self._propertyChanged("rotation");
                        }
                    }
                }
            });


            Object.defineProperty(this, "getMatrix", {
                value: function () {
                    if (_matrix == null || _isDirty) {
                        _matrix = new lib.Cgx.Matrix();
                        _matrix.translate(_self.translationX, _self.translationY);
                        _matrix.rotate(_self.rotation);
                        _matrix.scale(_self.scaleX, _self.scaleY);
                    }
                    return _matrix;
                }
            });


            Object.defineProperty(this, "isIdentity", {
                get: function () {
                    if (_translationX == 0 && _translationY == 0) {
                        if (_scaleX == 1 && _scaleY == 1) {
                            if (_rotation == 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            });


            Object.defineProperty(this, "reset", {
                value: function () {
                    _originX = 0.0;
                    _originY = 0.0;
                    _translationX = 0.0;
                    _translationY = 0.0;
                    _scaleX = 1.0;
                    _scaleY = 1.0;
                    _rotation = 0.0;
                    _matrix = null;
                }
            });

            Object.defineProperty(this, "setDirty", {
                value: function () {
                    _isDirty = true;
                }
            });


            Object.defineProperty(this, "transformPoint", {
                value: function (x, y) {
                    return _self.getMatrix().transformPoint(x, y);
                }
            });

            Object.defineProperty(this, "transformRect", {
                value: function (x, y, width, height) {
                    return _self.getMatrix().transformRect(x, y, width, height);
                }
            });

        }

        return Transform;

    })();
    lib.Cgx.Transform = Transform;

})(library);
