
namespace Cgx {

    export type AnimatorValue = number | number[] | { [name: string]: number } | Point;

    export class Animator {

        private _startValue: AnimatorValue;
        private _endValue: AnimatorValue;
        private _totalTime: number;
        private _ease = "linear";
        private _easeFunction: (time: number) => any;
        private _onValueCallback: (value: any) => void;
        private _onCompleted: () => void;
        private _lastTimeStamp: number;
        private _elapsedTime = 0;
        private _frameIndex = 0;
        private _isRunning = false;
        private _isCompleted = false;
        private _inputIsArray = false;
        private _inputIsObject = false;
        private _deltaValue: AnimatorValue = null;
        private _isDeltaDirty = true;

        constructor(
            startValue: AnimatorValue,
            endValue: AnimatorValue,
            totalTime: number,
            easeFunction: (time: number) => any,
            onValueCallback: (value: AnimatorValue) => void,
            onCompleted: () => void
        ) {
            this._startValue = startValue;
            this._endValue = endValue;
            this._totalTime = totalTime;
            this._easeFunction = easeFunction;
            this._onValueCallback = onValueCallback;
            this._onCompleted = onCompleted;

            this.reset();
        }


        private computeDeltaValue() {

            if (typeof this._startValue !== typeof this._endValue) {
                throw new Error("invalid type, startValue, endValue");
            }

            this._inputIsObject = false;
            this._inputIsArray = false;

            if (this._startValue instanceof Array) {
                this._inputIsArray = true;

                if (this._startValue.length != (<number[]>this._endValue).length) {
                    throw new Error("invalid array length, startValue, endValue");
                }
                this._deltaValue = (<number[]>this._endValue).map(function (v: number, i: number) {
                    return v - this._startValue[i];
                });
            }
            else if (typeof this._startValue === "object") {
                this._inputIsObject = true;

                this._deltaValue = {};
                for (var n in (<{[name: string]: number}>this._endValue)) {
                    if (this._endValue.hasOwnProperty(n)) {
                        this._deltaValue[n] = (<{ [name: string]: number }>this._endValue)[n] - (<{ [name: string]: number }>this._startValue)[n];
                    }
                }
            }
            else {
                this._deltaValue = <number>this._endValue - this._startValue;
            }
        }


        public get startValue() { return this._startValue; }
        public set startValue(v: AnimatorValue) {
            if (this._startValue !== v) {
                this._startValue = v;
                this.reset();
                this._isDeltaDirty = true;
            }
        }

        public get endValue() { return this._endValue; }
        public set endValue(v: AnimatorValue) {
            if (this._endValue !== v) {
                this._endValue = v;
                this.reset();
                this._isDeltaDirty = true;
            }
        }

        public get totalTime() { return this._totalTime; }
        public set totalTime(v: number) {
            if (this._totalTime !== v) {
                this.reset();
                this._totalTime = v;
            }
        }

        public get ease() { return this._ease; }
        public set ease(v: string) {
            if (this._ease !== v) {
                this._ease = v;
                this._easeFunction = Ease.getEasingFunctionOrDefault(this._ease);
            }
        }

        public get isCompleted() { return this._isCompleted; }

        public get elapsedTime() { return this._elapsedTime; }

        public get frameIndex() { return this._frameIndex; }



        public provideValue() {

            var lt = this._elapsedTime / this._totalTime;
            var lv = this._easeFunction(lt);

            if (this._inputIsArray) {
                return (<number[]>this._deltaValue).map(function (v: number, i: number) {
                    return (<number[]>this._startValue)[i] + (lv * v);
                });
            }
            else if (this._inputIsObject) {
                var result: { [name: string]: any } = {};
                for (var n in (<{ [name: string]: any }>this._deltaValue)) {
                    if (this._deltaValue.hasOwnProperty(n)) {
                        result[n] = (<{ [name: string]: any }>this._startValue)[n] + (lv *  (<{ [name: string]: any }>this._deltaValue)[n]);
                    }
                }
                return result;
            }
            else {
                return <number>this._startValue + (lv * <number>this._deltaValue);
            }
        }

        public notifyFrame(timeStamp: number) {
            if (this._isRunning) {
                if (!this._lastTimeStamp) {
                    this._lastTimeStamp = timeStamp;
                }
                this._elapsedTime += (timeStamp - this._lastTimeStamp);
                if (this._elapsedTime > this._totalTime) {
                    this.stop();
                    this._isCompleted = true;
                    this._onCompleted();
                    return;
                }

                this._lastTimeStamp = timeStamp;
                this._frameIndex++;

                this._onValueCallback(this.provideValue());
            }
        }

        public start() {
            if (this._isRunning) {
                return;
            }
            if (!this._deltaValue || this._isDeltaDirty) {
                this.computeDeltaValue();
            }
            this._isRunning = true;
        }

        public stop() {
            if (!this._isRunning) {
                return;
            }
            this._isRunning = false;
        }

        public restart() {
            this.reset();
            this.start();
        }

        public reset() {
            if (this._isRunning) {
                this.stop();
            }
            this._lastTimeStamp = null;
            this._elapsedTime = 0;
            this._frameIndex = 0;
            this._isCompleted = false;
        }
    }

}
