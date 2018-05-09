

(function (window, lib) {

    var exports = {};

    Object.defineProperty(exports, "LinearGradientBrush", { value: lib.Cgx.LinearGradientBrush });
    Object.defineProperty(exports, "RadialGradientBrush", { value: lib.Cgx.RadialGradientBrush });
    Object.defineProperty(exports, "PatternBrush", { value: lib.Cgx.PatternBrush });
    Object.defineProperty(exports, "CoreGraphics", { value: lib.Cgx.CoreGraphics });
    Object.defineProperty(exports, "Matrix", { value: lib.Cgx.Matrix });
    Object.defineProperty(exports, "Transform", { value: lib.Cgx.Transform });
    Object.defineProperty(exports, "RenderLoop", { value: lib.Cgx.RenderLoop });

    Object.defineProperty(window, "Cgx", { value: exports });

})(window, library);

delete library;