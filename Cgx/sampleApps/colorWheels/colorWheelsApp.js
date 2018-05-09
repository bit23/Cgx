

var _canvas;
var _graphics;

window.addEventListener("DOMContentLoaded", () => {

    _canvas = document.createElement("canvas");
    _canvas.width = 600;
    _canvas.height = 300;
    _canvas.style.width = _canvas.width + "px";
    _canvas.style.height = _canvas.height + "px";

    document.body.appendChild(_canvas);

    _graphics = new Cgx.CoreGraphics(_canvas);

    draw();
});



function hsvToRgb(h, s, v) {

    if (h < 0) h = 0;
    if (s < 0) s = 0;
    if (v < 0) v = 0;

    if (h > 1) h = 1;
    if (s > 1) s = 1;
    if (v > 1) v = 1;

    h *= 360;

    var chroma = v * s;
    var hh = h / 60;
    var x = chroma * (1 - Math.abs(hh % 2 - 1));

    var r = 0;
    var g = 0;
    var b = 0;

    if (hh >= 0 && hh < 1) {
        r = chroma;
        g = x;
    }
    else if (hh >= 1 && hh < 2) {
        r = x;
        g = chroma;
    }
    else if (hh >= 2 && hh < 3) {
        g = chroma;
        b = x;
    }
    else if (hh >= 3 && hh < 4) {
        g = x;
        b = chroma;
    }
    else if (hh >= 4 && hh < 5) {
        r = x;
        b = chroma;
    }
    else {
        r = chroma;
        b = x;
    }

    var m = v - chroma;
    r += m;
    g += m;
    b += m;

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return [r, g, b];
}

function drawDot(x, y, radius, rgb, transform) {
    _graphics.setFillBrush(rgb);
    _graphics.drawCircle(x, y, radius, transform);
}

function drawCircularHueDots(distanceToCenter, dotSize, dotOffset, s, v) {

    var c = 2 * Math.PI * distanceToCenter;
    var angleStepsCount = Math.floor(c / dotOffset);
    if (angleStepsCount == 0) angleStepsCount = 1;
    var angleOffset = 360 / angleStepsCount;
    var hueOffset = 1 / angleStepsCount;
    var hue = 0;

    var transform = new Cgx.Transform();

    for (var angleStep = 0; angleStep < angleStepsCount; angleStep++) {

        var rgb = hsvToRgb(hue, s, v);

        transform.reset();
        transform.translationX = distanceToCenter;
        transform.rotation = angleStep * angleOffset;

        drawDot(0, 0, dotSize, rgb, transform);

        hue += hueOffset;
    }
}

function drawColorWheel(stepsCount, dotSize, dotOffset, saturationStart, valueStart, saturationStepHandler, valueStepHandler) {

    var saturation = saturationStart;
    var value = valueStart;

    for (var step = 0; step < stepsCount; step++) {
        var r = step * dotOffset;
        drawCircularHueDots(r, dotSize, dotOffset, saturation, value);

        if (typeof saturationStepHandler === "function")
            saturation = saturationStepHandler(stepsCount, step, saturation);

        if (typeof valueStepHandler === "function")
            value = valueStepHandler(stepsCount, step, value);
    }
}

function draw() {

    _graphics.setStrokeBrush(null);
    _graphics.clear();

    var transform = new Cgx.Transform();

    transform.translationX = _canvas.width / 2;
    transform.translationY = _canvas.height / 2;
    _graphics.pushTransform(transform);


    var data;

    transform.translationX = -150;
    transform.translationY = 0;
    _graphics.pushTransform(transform);
    data = {
        stepsCount: 10, dotRadius: 10, dotOffset: 14, startSaturation: 1, startValue: 0,
        valueStepHandler: (stepsCount, step, value) => value + (1 / stepsCount)
    };
    drawColorWheel(
        data.stepsCount, data.dotRadius, data.dotOffset, data.startSaturation, data.startValue,
        data.saturationStepHandler,
        data.valueStepHandler
    );
    _graphics.popTransform();



    transform.translationX = 150;
    transform.translationY = 0;
    _graphics.pushTransform(transform);
    data = {
        stepsCount: 10, dotRadius: 10, dotOffset: 14, startSaturation: 0, startValue: 1,
        saturationStepHandler: (stepsCount, step, saturation) => saturation + (1 / stepsCount)
    };
    drawColorWheel(
        data.stepsCount, data.dotRadius, data.dotOffset, data.startSaturation, data.startValue,
        data.saturationStepHandler,
        data.valueStepHandler
    );
    _graphics.popTransform();


    _graphics.popTransform();
}