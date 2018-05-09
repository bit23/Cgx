
(function (lib) {

    /**
     * #type: <Vgx> internal abstract class <Brush>
     * #description: Abstact class Brush, use only for inheritation
     */
    var Brush = (function () {

        /**
         * #type: <Vgx.Brush> constructor
         * #description: Brush constructor, used by inherited classes
         * #param: <type> {string} The type of brush ('linear'|'radial'|'pattern')
         */
        function Brush(type) {

            var _brushType = type;

            /**
             * #type: <Vgx.Brush> internal property get <_brushType>
             * #description: The type of brush
             * #valueType: {string}
             */
            Object.defineProperty(this, "_brushType", {
                get: function () {
                    return _brushType;
                },
                enumerable: false
            });
        }

        return Brush;
    })();
    lib.Cgx.Brush = Brush;


    /**
     * #type: <Vgx> internal abstract class <GradientBrush> extends <Vgx.Brush>
     * #description: Abstact class GradientBrush, use only for inheritation
     */
    var GradientBrush = (function () {

        /**
         * #type: <Vgx.GradientBrush> constructor
         * #description: GradientBrush constructor, used by inherited classes
         * #param: <type> {string} The type of brush ('linear'|'radial')
         */
        function GradientBrush(type) {
            Brush.apply(this, [type]);

            var _colorStops = [];

            /**
             * #type: <Vgx.GradientBrush> internal method <_getColorStops>
             * #description: The list of ColorStop in the gradient brush
             * #returnType: {Array<ColorStop>}
             */
            Object.defineProperty(this, "_getColorStops", {
                value: function () { return _colorStops; },
                enumerable: false
            });

            /**
             * #type: <Vgx.GradientBrush> public method <addColorStop>
             * #description: Add a new color stop to the gradient brush
             * #param: <offset> {number} Color stop offset
             * #param: <color> {number|string} Color stop color
             * #returnType: {void}
             */
            Object.defineProperty(this, "addColorStop", {
                value: function (offset, color) {
                    _colorStops.push({ offset: offset, color: color });
                }
            });
        }

        GradientBrush.prototype = Object.create(Brush.prototype);
        GradientBrush.prototype.consrtuctor = GradientBrush;

        return GradientBrush;
    })();
    lib.Cgx.GradientBrush = GradientBrush;


    /**
     * #type: <Vgx> public class <LinearGradientBrush> extends <Vgx.GradientBrush>
     * #description: LinearGradientBrush class
     */
    var LinearGradientBrush = (function () {

        /**
         * #type: <Vgx.LinearGradientBrush> constructor
         * #description: LinearGradientBrush constructor
         */
        function LinearGradientBrush() {
            GradientBrush.apply(this, ["linear"]);

            /**
             * #type: <Vgx.Brush> public property get set <x0>
             * #description: Represents the x coordinate of the starting point
             * #valueType: {number}
             */
            Object.defineProperty(this, "x0", {
                writable: true,
                value: 0
            });

            /**
             * #type: <Vgx.Brush> public property get set <y0>
             * #description: Represents the y coordinate of the starting point
             * #valueType: {number}
             */
            Object.defineProperty(this, "y0", {
                writable: true,
                value: 0
            });

            /**
             * #type: <Vgx.Brush> public property get set <x1>
             * #description: Represents the x coordinate of the ending point
             * #valueType: {number}
             */
            Object.defineProperty(this, "x1", {
                writable: true,
                value: 100
            });

            /**
             * #type: <Vgx.Brush> public property get set <y1>
             * #description: Represents the y coordinate of the ending point
             * #valueType: {number}
             */
            Object.defineProperty(this, "y1", {
                writable: true,
                value: 100
            });
        }

        LinearGradientBrush.prototype = Object.create(GradientBrush.prototype);
        LinearGradientBrush.prototype.consrtuctor = LinearGradientBrush;

        return LinearGradientBrush;
    })();
    lib.Cgx.LinearGradientBrush = LinearGradientBrush;


    /**
     * #type: <Vgx> public class <RadialGradientBrush> extends <Vgx.GradientBrush>
     * #description: RadialGradientBrush class
     */
    var RadialGradientBrush = (function () {

        /**
         * #type: <Vgx.RadialGradientBrush> constructor
         * #description: RadialGradientBrush constructor
         */
        function RadialGradientBrush() {
            GradientBrush.apply(this, ["radial"]);

            /**
             * #type: <Vgx.Brush> public property get set <x0>
             * #description: Represents the x coordinate of the starting point
             * #valueType: {number}
             */
            Object.defineProperty(this, "x0", {
                writable: true,
                value: 0
            });

            /**
             * #type: <Vgx.Brush> public property get set <y0>
             * #description: Represents the y coordinate of the starting point
             * #valueType: {number}
             */
            Object.defineProperty(this, "y0", {
                writable: true,
                 value: 0 });

            /**
             * #type: <Vgx.Brush> public property get set <r0>
             * #description: Radius of the starting point
             * #valueType: {number}
             */
            Object.defineProperty(this, "r0", {
                writable: true,
                 value: 0 });

            /**
             * #type: <Vgx.Brush> public property get set <x1>
             * #description: Represents the x coordinate of the ending point
             * #valueType: {number}
             */
            Object.defineProperty(this, "x1", {
                writable: true,
                 value: 100 });

            /**
             * #type: <Vgx.Brush> public property get set <y1>
             * #description: Represents the y coordinate of the ending point
             * #valueType: {number}
             */
            Object.defineProperty(this, "y1", {
                writable: true,
                 value: 100 });

            /**
             * #type: <Vgx.Brush> public property get set <r1>
             * #description: Radius of the ending point
             * #valueType: {number}
             */
            Object.defineProperty(this, "r1", {
                writable: true,
                 value: 0 });
        }

        RadialGradientBrush.prototype = Object.create(GradientBrush.prototype);
        RadialGradientBrush.prototype.consrtuctor = RadialGradientBrush;

        return RadialGradientBrush;
    })();
    lib.Cgx.RadialGradientBrush = RadialGradientBrush;


    /**
     * #type: <Vgx> public class <PatternBrush> extends <Vgx.Brush>
     * #description: PatternBrush class
     */
    var PatternBrush = (function () {

        /**
         * #type: <Vgx.PatternBrush> constructor
         * #description: PatternBrush constructor
         */
        function PatternBrush() {
            Brush.apply(this, ["pattern"]);

            /**
             * #type: <Vgx.PatternBrush> public property get set <image>
             * #description: Represents the image used by the pattern
             * #valueType: {HTMLImageElement}
             */
            Object.defineProperty(this, "image", { value: null, writable: true });

            /**
             * #type: <Vgx.PatternBrush> public property get set <repetition>
             * #description: Represents the repetition mode of the pattern
             * #valueType: {string}
             */
            Object.defineProperty(this, "repetition", { value: "repeat", writable: true });
        }

        PatternBrush.prototype = Object.create(Brush.prototype);
        PatternBrush.prototype.consrtuctor = PatternBrush;

        return PatternBrush;
    })();
    lib.Cgx.PatternBrush = PatternBrush;


})(library);