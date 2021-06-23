
namespace Cgx {

    export interface LoopArgs {
        instance: RenderLoop,
        data: any,
        deltaTime: number
    }

    export type LoopCallback = (args: LoopArgs) => void;

    export class RenderLoop {

        private _loopCallback: LoopCallback;
        private _maxFps = 0;
        private _isRunning = false;
        private _loopArgs: LoopArgs = {
            instance: this,
            data: null,
            deltaTime: 0
        };

        private _lastLoopTime: number;
        private _renderTimeAccumulator = 0;
        private _renderTimeInterval: number;
        private _lastRenderDeltaTime = 0;
        private _fpsCounter: FpsCounter;

        private _animators: Animator[] = [];
        private _animatorsToRemove: Animator[] = [];

        constructor(loopCallback: LoopCallback) {

            if (typeof loopCallback !== "function") {
                throw new Error("missing loop callback");
            }
            this._loopCallback = loopCallback;

            this._fpsCounter = new FpsCounter();

            this.computeTimeInterval();

            this._lastLoopTime = Date.now();
            requestAnimationFrame(this.onRenderFrame.bind(this));
        }

        private onRenderFrame(timeStamp: number) {

            if (this._isRunning) {

                if (!this._lastLoopTime) this._lastLoopTime = timeStamp;
                var timeElapsed = timeStamp - this._lastLoopTime;
                if (timeElapsed < 0) timeElapsed = 0;
                this._lastLoopTime = timeStamp;

                if (this._renderTimeInterval > 0) {

                    this._renderTimeAccumulator += timeElapsed;

                    if (this._renderTimeAccumulator >= this._renderTimeInterval) {
                        this._renderTimeAccumulator -= this._renderTimeInterval;
                        this._loopArgs.deltaTime = this._lastLoopTime - this._lastRenderDeltaTime;
                        this._lastRenderDeltaTime = this._lastLoopTime;
                        this._loopCallback(this._loopArgs);
                        this._fpsCounter.notifyFrame(timeStamp);
                        this.onAnimatorFrame(timeStamp);
                    }
                }
                else {
                    this._loopArgs.deltaTime = timeElapsed;
                    this._loopCallback(this._loopArgs);
                    this._fpsCounter.notifyFrame(timeStamp);
                    this.onAnimatorFrame(timeStamp);
                }


            }

            requestAnimationFrame(this.onRenderFrame.bind(this));
        }

        private onAnimatorFrame(timeStamp: number) {
            this._animators.forEach(a => {
                a.notifyFrame(timeStamp);
                if (a.isCompleted) {
                    var i = this._animatorsToRemove.indexOf(a);
                    if (i >= 0) {
                        this._animatorsToRemove.splice(i, 1);
                        this._animators.splice(this._animators.indexOf(a), 1);
                    }
                }
            });
        }

        private computeTimeInterval() {
            if (this._maxFps <= 0 || !Number.isFinite(this._maxFps)) {
                this._renderTimeInterval = 0;
            } else {
                this._renderTimeInterval = 1000 / this._maxFps;
            }
        }


        public get currentFps() { return this._fpsCounter.fps; }

        public get maxFps() { return this._maxFps; }
        public set maxFps(v: number) {
            if (this._maxFps != v) {
                this._maxFps = v;
                this.computeTimeInterval();
            }
        }

        public get data() { return this._loopArgs.data; }
        public set data(v: number) {
            this._loopArgs.data = v;
        }

        public get isRunning() { return this._isRunning; }


        public start() {
            this._isRunning = true;
            this._fpsCounter.start();
        }

        public stop() {
            this._isRunning = false;
            this._fpsCounter.stop();
        }

        public animate(startValue: AnimatorValue, endValue: AnimatorValue, totalTime: number, easing: string, onValueCallback: (value: AnimatorValue) => void, onCompleted: () => void) {
            var animator = this.createAnimator(
                startValue, endValue, totalTime, easing,
                onValueCallback,
                onCompleted
            );
            this.addAnimator(animator, true);
            animator.start();
        }

        public createAnimator(startValue: AnimatorValue, endValue: AnimatorValue, totalTime: number, easing: string, onValueCallback: (value: AnimatorValue) => void, onCompleted: () => void) {
            return new Animator(
                startValue, endValue, totalTime, Ease.getEasingFunctionOrDefault(easing),
                onValueCallback,
                onCompleted
            );
        }

        public addAnimator(animator: Animator, autoRemoveOnCompleted: boolean) {
            if (this._animators.indexOf(animator) === -1) {
                this._animators.push(animator);
                if (autoRemoveOnCompleted) {
                    this._animatorsToRemove.push(animator);
                }
                return this._animators.length - 1;
            }
            return -1;
        }

        public removeAnimator(animator: Animator) {
            var index = this._animatorsToRemove.indexOf(animator);
            if (index >= 0) {
                this._animatorsToRemove.splice(index, 1);
            }

            index = this._animators.indexOf(animator);
            if (index >= 0) {
                this._animators.splice(index, 1);
                return true;
            }
            return false;
        }
    }
}