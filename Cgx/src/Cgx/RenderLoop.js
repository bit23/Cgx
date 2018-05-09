

(function (lib) {

    var Ease = (function () {

        var Ease = {};


        Object.defineProperty(Ease, "getEasingFunctionOrDefault", {
            value: function (easing) {
                if (easing in Ease) {
                    return Ease[easing];
                }
                return Ease.linear;
            }
        });


        Object.defineProperty(Ease, "linear", {
            value: function (t) {
                return t;
            }
        });


        Object.defineProperty(Ease, "quadraticIn", {
            value: function (t) {
                return Math.pow(t, 2);
            }
        });

        Object.defineProperty(Ease, "quadraticOut", {
            value: function (t) {
                return 1 - Math.pow(1 - t, 2);
            }
        });

        Object.defineProperty(Ease, "quadraticInOut", {
            value: function (t) {
                if (t < 0.5) {
                    t *= 2;
                    return Math.pow(t, 2) * 0.5;
                } else {
                    t = (t - 0.5) * 2;
                    return ((1 - Math.pow(1 - t, 2)) * 0.5) + 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "cubicIn", {
            value: function (t) {
                return Math.pow(t, 3);
            }
        });

        Object.defineProperty(Ease, "cubicOut", {
            value: function (t) {
                return 1 - Math.pow(1 - t, 3);
            }
        });

        Object.defineProperty(Ease, "cubicInOut", {
            value: function (t) {
                if (t < 0.5) {
                    t *= 2;
                    return Math.pow(t, 3) * 0.5;
                } else {
                    t = (t - 0.5) * 2;
                    return ((1 - Math.pow(1 - t, 3)) * 0.5) + 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "quarticIn", {
            value: function (t) {
                return Math.pow(t, 4);
            }
        });

        Object.defineProperty(Ease, "quarticOut", {
            value: function (t) {
                return 1 - Math.pow(1 - t, 4);
            }
        });

        Object.defineProperty(Ease, "quarticInOut", {
            value: function (t) {
                if (t < 0.5) {
                    t *= 2;
                    return Math.pow(t, 4) * 0.5;
                } else {
                    t = (t - 0.5) * 2;
                    return ((1 - Math.pow(1 - t, 4)) * 0.5) + 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "quinticIn", {
            value: function (t) {
                return Math.pow(t, 5);
            }
        });

        Object.defineProperty(Ease, "quinticOut", {
            value: function (t) {
                return 1 - Math.pow(1 - t, 5);
            }
        });

        Object.defineProperty(Ease, "quinticInOut", {
            value: function (t) {
                if (t < 0.5) {
                    t *= 2;
                    return Math.pow(t, 5) * 0.5;
                } else {
                    t = (t - 0.5) * 2;
                    return ((1 - Math.pow(1 - t, 5)) * 0.5) + 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "sineIn", {
            value: function (t) {
                return -Math.cos(t * Math.PI * 0.5) + 1;
            }
        });

        Object.defineProperty(Ease, "sineOut", {
            value: function (t) {
                return Math.sin(t * Math.PI * 0.5);
            }
        });

        Object.defineProperty(Ease, "sineInOut", {
            value: function (t) {
                return -0.5 * (Math.cos(t * Math.PI) - 1);
            }
        });


        Object.defineProperty(Ease, "expoIn", {
            value: function (t) {
                return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
            }
        });

        Object.defineProperty(Ease, "expoOut", {
            value: function (t) {
                return (t == 1) ? 1 : -Math.pow(2, -10 * t) + 1;
            }
        });

        Object.defineProperty(Ease, "expoInOut", {
            value: function (t) {
                if (t == 0) return 0;
                if (t == 1) return 1;
                t = t / 0.5;
                if (t < 1) return Math.pow(2, 10 * (t - 1)) * 0.5;
                return (-Math.pow(2, -10 * --t) + 2) * 0.5;
            }
        });


        Object.defineProperty(Ease, "bounceIn", {
            value: function (t) {
                t = 1 - t;
                return 1 - Ease.bounceOut(t);
            }
        });

        Object.defineProperty(Ease, "bounceOut", {
            value: function (t) {
                if (t < 0.3637) {
                    return 7.5625 * t * t;
                } else if (t < 0.7272) {
                    return (7.5625 * (t -= 0.5454) * t + 0.75);
                } else if (t < 0.9090) {
                    return (7.5625 * (t -= 0.8181) * t + 0.9375);
                } else {
                    return (7.5625 * (t -= 0.9545) * t + 0.984375);
                }
            }
        });

        Object.defineProperty(Ease, "bounceInOut", {
            value: function (t) {
                if (t < 0.5) {
                    return Ease.bounceIn(t * 2) * 0.5;
                } else {
                    return Ease.bounceOut((t * 2) - 1) * 0.5 + 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "backIn", {
            value: function (t) {
                var s = 1.70158;
                return t * t * ((s + 1) * t - s);
            }
        });

        Object.defineProperty(Ease, "backOut", {
            value: function (t) {
                var s = 1.70158;
                t = t - 1;
                return (t * t * ((s + 1) * t + s) + 1);
            }
        });

        Object.defineProperty(Ease, "backInOut", {
            value: function (t) {
                var d = 1;
                var s = 1.70158;
                t = t / 0.5;
                if (t < 1) {
                    return (t * t * (((s *= (1.525)) + 1) * t - s)) * 0.5;
                } else {
                    return ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) * 0.5;
                }
            }
        });


        Object.defineProperty(Ease, "elasticIn", {
            value: function (t) {
                var p;
                var a;
                var s;
                if (t == 0) return 0;
                if (t == 1) return 1;
                if (!p) {
                    p = 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = 1;
                    s = p / 4;
                }
                else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            }
        });

        Object.defineProperty(Ease, "elasticOut", {
            value: function (t) {
                var p;
                var a;
                var s;
                if (t == 0) return 0;
                if (t == 1) return 1;
                if (!p) {
                    p = 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = 1;
                    s = p / 4;
                }
                else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1);
            }
        });

        Object.defineProperty(Ease, "elasticInOut", {
            value: function (t) {
                var p;
                var a;
                var s;
                if (t == 0) return 0;
                t = t / 0.5;
                if (t == 2) return 1;
                if (!p) {
                    p = 0.3 * 1.5;
                }
                if (!a || a < Math.abs(c)) {
                    a = 1;
                    s = p / 4;
                }
                else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                if (t < 1) {
                    return (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p)) * -0.5;
                }
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
            }
        });


        Object.defineProperty(Ease, "circularIn", {
            value: function (t) {
                return -(Math.sqrt(1 - t * t) - 1);
            }
        });

        Object.defineProperty(Ease, "circularOut", {
            value: function (t) {
                t = t - 1;
                return Math.sqrt(1 - t * t);
            }
        });

        Object.defineProperty(Ease, "circularInOut", {
            value: function (t) {
                t = t / 0.5;
                if (t < 1)
                    return -(Math.sqrt(1 - t * t) - 1) * 0.5;
                return (Math.sqrt(1 - (t -= 2) * t) + 1) * 0.5;
            }
        });


        return Ease;
    })();

    //var Animator = (function () {

    //    function Animator(startValue, endValue, totalTime, easeFunction, onValueCallback, onCompleted) {

    //        var _self = this;
    //        var _startValue = startValue;
    //        var _endValue = endValue;
    //        var _totalTime = totalTime;
    //        var _ease = "linear";
    //        var _easeFunction = easeFunction;
    //        var _onValueCallback = onValueCallback;
    //        var _onCompleted = onCompleted;

    //        var _deltaValue = _endValue - _startValue;
    //        var _lastComputedValue = _startValue;
    //        var _lastTimeStamp;
    //        var _elapsedTime = 0;
    //        var _frameIndex = 0;
    //        var _isRunning = false;
    //        var _isCompleted = false;


    //        function _init() {
    //            _self.reset();
    //        }


    //        Object.defineProperty(this, "startValue", {
    //            get: function () { return _startValue; },
    //            set: function (v) {
    //                if (_startValue != v) {
    //                    _startValue = v;
    //                }
    //            }
    //        });

    //        Object.defineProperty(this, "endValue", {
    //            get: function () { return _endValue; },
    //            set: function (v) {
    //                if (_endValue != v) {
    //                    _endValue = v;
    //                }
    //            }
    //        });

    //        Object.defineProperty(this, "totalTime", {
    //            get: function () { return _totalTime; },
    //            set: function (v) {
    //                if (_totalTime != v) {
    //                    _totalTime = v;
    //                }
    //            }
    //        });

    //        Object.defineProperty(this, "ease", {
    //            get: function () { return _ease; },
    //            set: function (v) {
    //                if (_ease != v) {
    //                    _ease = v;
    //                    _easeFunction = Ease.getEasingFunctionOrDefault(_ease);
    //                }
    //            }
    //        });


    //        Object.defineProperty(this, "isCompleted", {
    //            get: function () { return _isCompleted; }
    //        });

    //        Object.defineProperty(this, "elapsedTime", {
    //            get: function () { return _elapsedTime; }
    //        });

    //        Object.defineProperty(this, "frameIndex", {
    //            get: function () { return _frameIndex; }
    //        });


    //        Object.defineProperty(this, "provideValue", {
    //            value: function () {
    //                var lt = _elapsedTime / _totalTime;
    //                var lv = _easeFunction(lt);
    //                return _startValue + (lv * _deltaValue);
    //            }
    //        });

    //        Object.defineProperty(this, "notifyFrame", {
    //            value: function (timeStamp) {
    //                if (_isRunning) {
    //                    if (!_lastTimeStamp) {
    //                        _lastTimeStamp = timeStamp;
    //                    }
    //                    _elapsedTime += (timeStamp - _lastTimeStamp);
    //                    if (_elapsedTime > _totalTime) {
    //                        _self.stop();
    //                        _isCompleted = true;
    //                        _onCompleted();
    //                        return;
    //                    }

    //                    _lastTimeStamp = timeStamp;
    //                    _frameIndex++;

    //                    _onValueCallback(_self.provideValue());
    //                }
    //            }
    //        });

    //        Object.defineProperty(this, "start", {
    //            value: function () {
    //                if (_isRunning) {
    //                    return;
    //                }
    //                _isRunning = true;
    //            }
    //        });

    //        Object.defineProperty(this, "stop", {
    //            value: function () {
    //                if (!_isRunning) {
    //                    return;
    //                }
    //                _isRunning = false;
    //            }
    //        });

    //        Object.defineProperty(this, "restart", {
    //            value: function () {
    //                if (_isRunning) {
    //                    _self.reset();
    //                }
    //                _self.start();
    //            }
    //        });

    //        Object.defineProperty(this, "reset", {
    //            value: function () {
    //                if (_isRunning) {
    //                    _self.stop();
    //                }
    //                _lastComputedValue = _startValue;
    //                _lastTimeStamp = null;
    //                _elapsedTime = 0;
    //                _frameIndex = 0;
    //                _isCompleted = false;
    //            }
    //        });


    //        _init();
    //    }

    //    return Animator;

    //})();

    var Animator = (function () {

        function Animator(startValue, endValue, totalTime, easeFunction, onValueCallback, onCompleted) {

            var _self = this;
            var _startValue = startValue;
            var _endValue = endValue;
            var _totalTime = totalTime;
            var _ease = "linear";
            var _easeFunction = easeFunction;
            var _onValueCallback = onValueCallback;
            var _onCompleted = onCompleted;

            var _lastComputedValue = _startValue;
            var _lastTimeStamp;
            var _elapsedTime = 0;
            var _frameIndex = 0;
            var _isRunning = false;
            var _isCompleted = false;

            var _inputIsArray = false;
            var _inputIsObject = false;
            var _deltaValue = null;
            var _isDeltaDirty = true;


            function _init() {
                _self.reset();
            }

            function computeDeltaValue() {

                if (typeof _startValue !== typeof _endValue) {
                    throw new Error("invalid type, startValue, endValue");
                }

                _inputIsObject = false;
                _inputIsArray = false;
                if (typeof _startValue === "object") {
                    if (_startValue instanceof Array) {
                        _inputIsArray = true;
                    }
                    else {
                        _inputIsObject = true;
                    }
                }


                if (_inputIsArray) {
                    if (_startValue.length != _endValue.length) {
                        throw new Error("invalid array length, startValue, endValue");
                    }
                    _deltaValue =_endValue.map(function (v, i, a) {
                        return v - _startValue[i];
                    });
                }
                else if (_inputIsObject) {
                    _deltaValue = {};
                    for (var n in _endValue) {
                        if (_endValue.hasOwnProperty(n)) {
                            _deltaValue[n] = _endValue[n] - _startValue[n];
                        }
                    }
                }
                else {
                    _deltaValue = _endValue - _startValue;
                }
            }


            Object.defineProperty(this, "startValue", {
                get: function () { return _startValue; },
                set: function (v) {
                    if (_startValue != v) {
                        _startValue = v;
                        _self.reset();
                        _isDeltaDirty = true;
                    }
                }
            });

            Object.defineProperty(this, "endValue", {
                get: function () { return _endValue; },
                set: function (v) {
                    if (_endValue != v) {
                        _endValue = v;
                        _self.reset();
                        _isDeltaDirty = true;
                    }
                }
            });

            Object.defineProperty(this, "totalTime", {
                get: function () { return _totalTime; },
                set: function (v) {
                    if (_totalTime != v) {
                        _self.reset();
                        _totalTime = v;
                    }
                }
            });

            Object.defineProperty(this, "ease", {
                get: function () { return _ease; },
                set: function (v) {
                    if (_ease != v) {
                        _ease = v;
                        _easeFunction = Ease.getEasingFunctionOrDefault(_ease);
                    }
                }
            });


            Object.defineProperty(this, "isCompleted", {
                get: function () { return _isCompleted; }
            });

            Object.defineProperty(this, "elapsedTime", {
                get: function () { return _elapsedTime; }
            });

            Object.defineProperty(this, "frameIndex", {
                get: function () { return _frameIndex; }
            });


            Object.defineProperty(this, "provideValue", {
                value: function () {

                    var lt = _elapsedTime / _totalTime;
                    var lv = _easeFunction(lt);

                    if (_inputIsArray) {
                        return _deltaValue.map(function (v, i, a) {
                            return _startValue[i] + (lv * v);
                        });
                    }
                    else if (_inputIsObject) {
                        var result = {};
                        for (var n in _deltaValue) {
                            if (_deltaValue.hasOwnProperty(n)) {
                                result[n] = _startValue[n] + (lv * _deltaValue[n]);
                            }
                        }
                        return result;
                    }
                    else {
                        return _startValue + (lv * _deltaValue);
                    }
                }
            });

            Object.defineProperty(this, "notifyFrame", {
                value: function (timeStamp) {
                    if (_isRunning) {
                        if (!_lastTimeStamp) {
                            _lastTimeStamp = timeStamp;
                        }
                        _elapsedTime += (timeStamp - _lastTimeStamp);
                        if (_elapsedTime > _totalTime) {
                            _self.stop();
                            _isCompleted = true;
                            _onCompleted();
                            return;
                        }

                        _lastTimeStamp = timeStamp;
                        _frameIndex++;

                        _onValueCallback(_self.provideValue());
                    }
                }
            });

            Object.defineProperty(this, "start", {
                value: function () {
                    if (_isRunning) {
                        return;
                    }

                    if (!_deltaValue || _isDeltaDirty) {
                        computeDeltaValue();
                    }

                    _isRunning = true;
                }
            });

            Object.defineProperty(this, "stop", {
                value: function () {
                    if (!_isRunning) {
                        return;
                    }
                    _isRunning = false;
                }
            });

            Object.defineProperty(this, "restart", {
                value: function () {
                    _self.reset();
                    _self.start();
                }
            });

            Object.defineProperty(this, "reset", {
                value: function () {
                    if (_isRunning) {
                        _self.stop();
                    }
                    _lastComputedValue = _startValue;
                    _lastTimeStamp = null;
                    _elapsedTime = 0;
                    _frameIndex = 0;
                    _isCompleted = false;
                }
            });


            _init();
        }

        return Animator;

    })();

    var FpsCounter = (function () {

        function FpsCounter() {

            var _self = this;
            var _isRunning = false;
            var _lastTimeStamp;
            var _fps = 0;

            var _accumulatedFrames = 0;
            var _accumulatedTime = 0;


            Object.defineProperty(this, "fps", {
                get: function () { return _fps; }
            });

            Object.defineProperty(this, "sampleInterval", {
                writable: true,
                value: 500
            });


            Object.defineProperty(this, "notifyFrame", {
                value: function (timeStamp) {
                    if (_isRunning) {
                        //_framesCounter++;
                        if (!_lastTimeStamp) {
                            _lastTimeStamp = timeStamp;
                        }
                        var deltaTime = timeStamp - _lastTimeStamp;
                        
                        _lastTimeStamp = timeStamp;

                        if (_self.sampleInterval <= 0) {
                            _fps = 1000 / deltaTime;
                        }
                        else {
                            _accumulatedTime += deltaTime;
                            _accumulatedFrames++;
                            if (_accumulatedTime >= _self.sampleInterval) {
                                _fps = (1000 / _accumulatedTime) * _accumulatedFrames;
                                _accumulatedTime = 0;
                                _accumulatedFrames = 0;
                            }
                        }
                    }
                    else {
                        _fps = 0;
                    }
                }
            });

            Object.defineProperty(this, "start", {
                value: function () {
                    _isRunning = true;
                }
            });

            Object.defineProperty(this, "stop", {
                set: function () {
                    _isRunning = false;
                }
            });
        }
        return FpsCounter;
    })();

    var RenderLoop = (function () {

        function RenderLoop(loopCallback) {

            var _self = this;
            var _loopCallback = loopCallback;
            var _maxFps = 0;
            var _isRunning = false;
            var _loopArgs = {
                instance: _self,
                data: null,
                deltaTime: 0
            };

            var _lastLoopTime;
            var _renderTimeAccumulator = 0;
            var _renderTimeInterval;
            var _lastRenderDeltaTime = 0;
            var _fpsCounter;

            var _animators = [];
            var _animatorsToRemove = [];


            function _init() {

                if (typeof _loopCallback !== "function") {
                    throw new Error("missing loop callback");
                }

                _fpsCounter = new FpsCounter();

                computeTimeInterval();

                _lastLoopTime = Date.now();
                requestAnimationFrame(onRenderFrame);
            }


            function onRenderFrame(timeStamp) {

                if (_isRunning) {

                    if (!_lastLoopTime) _lastLoopTime = timeStamp;
                    var timeElapsed = timeStamp - _lastLoopTime;
                    if (timeElapsed < 0) timeElapsed = 0;
                    _lastLoopTime = timeStamp;

                    if (_renderTimeInterval > 0) {

                        _renderTimeAccumulator += timeElapsed;

                        if (_renderTimeAccumulator >= _renderTimeInterval) {
                            _renderTimeAccumulator -= _renderTimeInterval;
                            //_renderTimeAccumulator = 0;
                            _loopArgs.deltaTime = _lastLoopTime - _lastRenderDeltaTime;
                            _lastRenderDeltaTime = _lastLoopTime;
                            _loopCallback(_loopArgs);
                            _fpsCounter.notifyFrame(timeStamp);
                            //_animators.forEach(a => {
                            //    a.notifyFrame(timeStamp);
                            //    if (a.isCompleted) {

                            //    }
                            //});
                            onAnimatorFrame(timeStamp);
                        }
                    }
                    else {
                        _loopArgs.deltaTime = timeElapsed;
                        _loopCallback(_loopArgs);
                        _fpsCounter.notifyFrame(timeStamp);
                        //_animators.forEach(a => a.notifyFrame(timeStamp));
                        onAnimatorFrame(timeStamp);
                    }

                    
                }

                requestAnimationFrame(onRenderFrame);
            }

            function onAnimatorFrame(timeStamp) {
                _animators.forEach(a => {
                    a.notifyFrame(timeStamp);
                    if (a.isCompleted) {
                        var i = _animatorsToRemove.indexOf(a);
                        if (i >= 0) {
                            _animatorsToRemove.splice(i, 1);
                            _animators.splice(_animators.indexOf(a), 1);
                        }
                    }
                });
            }

            function computeTimeInterval() {
                if (_maxFps <= 0 || !Number.isFinite(_maxFps)) {
                    _renderTimeInterval = 0;
                } else {
                    _renderTimeInterval = 1000 / _maxFps;
                }
            }

            


            Object.defineProperty(this, "currentFps", {
                get: function () { return _fpsCounter.fps; }
            });

            Object.defineProperty(this, "maxFps", {
                get: function () { return _maxFps; },
                set: function (v) {
                    if (_maxFps != v) {
                        _maxFps = v;
                        computeTimeInterval();
                    }
                }
            });

            Object.defineProperty(this, "data", {
                get: function () { return _loopArgs.data; },
                set: function (v) {
                    _loopArgs.data = v;
                }
            });


            Object.defineProperty(this, "isRunning", {
                get: function () { return _isRunning; }
            });

            Object.defineProperty(this, "start", {
                value: function () {
                    _isRunning = true;
                    _fpsCounter.start();
                }
            });

            Object.defineProperty(this, "stop", {
                set: function () {
                    _isRunning = false;
                    _fpsCounter.stop();
                }
            });



            Object.defineProperty(this, "animate", {
                value: function (startValue, endValue, totalTime, easing, onValueCallback, onCompleted) {
                    var animator = _self.createAnimator(
                        startValue, endValue, totalTime, easing,
                        onValueCallback,
                        /*function (a) {
                            removeAnimator(a);
                            onCompleted();
                        }*/
                        onCompleted
                    );
                    _self.addAnimator(animator, true);
                    animator.start();
                }
            });

            Object.defineProperty(this, "createAnimator", {
                value: function (startValue, endValue, totalTime, easing, onValueCallback, onCompleted) {
                    return new Animator(
                        startValue, endValue, totalTime, Ease.getEasingFunctionOrDefault(easing),
                        onValueCallback,
                        onCompleted
                    );
                }
            });

            Object.defineProperty(this, "addAnimator", {
                value: function (animator, autoRemoveOnCompleted) {
                    if (_animators.indexOf(animator) === -1) {
                        var index = _animators.push(animator);
                        if (autoRemoveOnCompleted) {
                            _animatorsToRemove.push(animator);
                        }
                        return _animators.length - 1;
                    }
                    return -1;
                }
            });

            Object.defineProperty(this, "removeAnimator", {
                value: function (animator) {

                    var index = _animatorsToRemove.indexOf(animator);
                    if (index >= 0) {
                        _animatorsToRemove.splice(index, 1);
                    }

                    index = _animators.indexOf(animator);
                    if (index >= 0) {
                        _animators.splice(index, 1);
                        return true;
                    }
                    return false;
                }
            });



            _init();
        }

        return RenderLoop;

    })();
    lib.Cgx.RenderLoop = RenderLoop;

})(library);