
namespace Cgx {

    export type EaseFunc = (t: number) => number;

    export class Ease {

        private static readonly easeFunctions = [
            "linear",
            "quadraticIn", "quadraticOut", "quadraticInOut",
            "cubicIn", "cubicOut", "cubicInOut",
            "quarticIn", "quarticOut", "quarticInOut",
            "quinticIn", "quinticOut", "quinticInOut",
            "sineIn", "sineOut", "sineInOut",
            "expoIn", "expoOut", "expoInOut",
            "bounceIn", "bounceOut", "bounceInOut",
            "backIn", "backOut", "backInOut",
            "elasticIn", "elasticOut", "elasticInOut",
            "circularIn", "circularOut", "circularInOut"
        ];

        public static getEaseFunctionNames(): ReadonlyArray<string> {
            return this.easeFunctions.slice(0);
        }

        public static getEasingFunctionOrDefault(easing: string) {
            if (easing in Ease) {
                return (<any>Ease)[easing];
            }
            return Ease.linear;
        }

        public static linear(t: number) {
            return t;
        }

        public static quadraticIn(t: number) {
            return Math.pow(t, 2);
        }

        public static quadraticOut(t: number) {
            return 1 - Math.pow(1 - t, 2);
        }

        public static quadraticInOut(t: number) {
            if (t < 0.5) {
                t *= 2;
                return Math.pow(t, 2) * 0.5;
            } else {
                t = (t - 0.5) * 2;
                return ((1 - Math.pow(1 - t, 2)) * 0.5) + 0.5;
            }
        }


        public static cubicIn(t: number) {
            return Math.pow(t, 3);
        }

        public static cubicOut(t: number) {
            return 1 - Math.pow(1 - t, 3);
        }

        public static cubicInOut(t: number) {
            if (t < 0.5) {
                t *= 2;
                return Math.pow(t, 3) * 0.5;
            } else {
                t = (t - 0.5) * 2;
                return ((1 - Math.pow(1 - t, 3)) * 0.5) + 0.5;
            }
        }


        public static quarticIn(t: number) {
            return Math.pow(t, 4);
        }

        public static quarticOut(t: number) {
            return 1 - Math.pow(1 - t, 4);
        }

        public static quarticInOut(t: number) {
            if (t < 0.5) {
                t *= 2;
                return Math.pow(t, 4) * 0.5;
            } else {
                t = (t - 0.5) * 2;
                return ((1 - Math.pow(1 - t, 4)) * 0.5) + 0.5;
            }
        }


        public static quinticIn(t: number) {
            return Math.pow(t, 5);
        }

        public static quinticOut(t: number) {
            return 1 - Math.pow(1 - t, 5);
        }

        public static quinticInOut(t: number) {
            if (t < 0.5) {
                t *= 2;
                return Math.pow(t, 5) * 0.5;
            } else {
                t = (t - 0.5) * 2;
                return ((1 - Math.pow(1 - t, 5)) * 0.5) + 0.5;
            }
        }


        public static sineIn(t: number) {
            return -Math.cos(t * Math.PI * 0.5) + 1;
        }

        public static sineOut(t: number) {
            return Math.sin(t * Math.PI * 0.5);
        }

        public static sineInOut(t: number) {
            return -0.5 * (Math.cos(t * Math.PI) - 1);
        }


        public static expoIn(t: number) {
            return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
        }

        public static expoOut(t: number) {
            return (t == 1) ? 1 : -Math.pow(2, -10 * t) + 1;
        }

        public static expoInOut(t: number) {
            if (t == 0) return 0;
            if (t == 1) return 1;
            t = t / 0.5;
            if (t < 1) return Math.pow(2, 10 * (t - 1)) * 0.5;
            return (-Math.pow(2, -10 * --t) + 2) * 0.5;
        }


        public static bounceIn(t: number) {
            t = 1 - t;
            return 1 - Ease.bounceOut(t);
        }

        public static bounceOut(t: number) {
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

        public static bounceInOut(t: number) {
            if (t < 0.5) {
                return Ease.bounceIn(t * 2) * 0.5;
            } else {
                return Ease.bounceOut((t * 2) - 1) * 0.5 + 0.5;
            }
        }


        public static backIn(t: number) {
            var s = 1.70158;
            return t * t * ((s + 1) * t - s);
        }

        public static backOut(t: number) {
            var s = 1.70158;
            t = t - 1;
            return (t * t * ((s + 1) * t + s) + 1);
        }

        public static backInOut(t: number) {
            var d = 1;
            var s = 1.70158;
            t = t / 0.5;
            if (t < 1) {
                return (t * t * (((s *= (1.525)) + 1) * t - s)) * 0.5;
            } else {
                return ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) * 0.5;
            }
        }


        public static elasticIn(t: number) {
            if (t === 0 || t === 1) {
                return t;
            }
            var p = 0.3,
                s = p / 4;
            return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        }

        public static elasticOut(t: number) {
            return 1 - Ease.elasticIn(1 - t);
        }

        public static elasticInOut(t: number) {
            if (t < 0.5) {
                return Ease.elasticIn(t * 2) * 0.5;
            } else {
                return Ease.elasticOut((t * 2) - 1) * 0.5 + 0.5;
            }
        }


        public static circularIn(t: number) {
            return -(Math.sqrt(1 - t * t) - 1);
        }

        public static circularOut(t: number) {
            t = t - 1;
            return Math.sqrt(1 - t * t);
        }

        public static circularInOut(t: number) {
            t = t / 0.5;
            if (t < 1)
                return -(Math.sqrt(1 - t * t) - 1) * 0.5;
            return (Math.sqrt(1 - (t -= 2) * t) + 1) * 0.5;
        }
    }
}