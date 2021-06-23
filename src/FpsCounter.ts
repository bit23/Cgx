
namespace Cgx {

    export class FpsCounter {

        private _fps: number;
        private _isRunning = false;
        private _lastTimestamp: number;
        private _accumulatedFrames = 0;
        private _accumulatedTime = 0;

        public sampleInterval = 500;

        public get fps() {
            return this._fps;
        }

        public notifyFrame(timestamp: number): void {
            if (this._isRunning) {
                if (!this._lastTimestamp) {
                    this._lastTimestamp = timestamp;
                }
                var deltaTime = timestamp - this._lastTimestamp;

                this._lastTimestamp = timestamp;

                if (this.sampleInterval <= 0) {
                    this._fps = 1000 / deltaTime;
                }
                else {
                    this._accumulatedTime += deltaTime;
                    this._accumulatedFrames++;
                    if (this._accumulatedTime >= this.sampleInterval) {
                        this._fps = (1000 / this._accumulatedTime) * this._accumulatedFrames;
                        this._accumulatedTime = 0;
                        this._accumulatedFrames = 0;
                    }
                }
            }
            else {
                this._fps = 0;
            }
        }

        public start() {
            this._isRunning = true;
        }

        public stop() {
            this._isRunning = false;
        }
    }
}