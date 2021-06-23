var _data = {
    "labels": [
        "Chrome",
        "Safari",
        "Firefox",
        "Opera",
        "Internet Explorer",
        "Edge",
        "Others"
    ],
    "dataset": [
        57.36,
        13.96,
        5.45,
        3.83,
        3.21,
        1.90,
        14.29
    ]
};

var _canvas;
var _graphics;

window.addEventListener("DOMContentLoaded", () => {

    _canvas = document.createElement("canvas");
    _canvas.width = 900;
    _canvas.height = 600;
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
    } else if (hh >= 1 && hh < 2) {
        r = x;
        g = chroma;
    } else if (hh >= 2 && hh < 3) {
        g = chroma;
        b = x;
    } else if (hh >= 3 && hh < 4) {
        g = x;
        b = chroma;
    } else if (hh >= 4 && hh < 5) {
        r = x;
        b = chroma;
    } else {
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

function drawPieChart(data) {

    var totalValue = data.dataset.reduce(function(previous, current, index, array) { return previous + current; });
    var ratio = 360 / totalValue;
    var currentAngle = 0;
    var degToRad = Math.PI / 180;
    var colorShift = 360 / (data.dataset.length);
    var textSize = 20;
    var textOffset = 40;
    var textTranslation = ((data.dataset.length * textSize) + ((data.dataset.length - 1) * textSize)) * 0.5;

    _graphics.fontSize = textSize;
    _graphics.textBaseline = "middle";

    _graphics.fillBrush = "#444";
    _graphics.drawText(350, y + 13, currentLabel + ": " + currentValue);

    _graphics.strokeBrush = null;
    _graphics.fillBrush = "white";
    _graphics.drawCircle(300, 0, 260);

    _graphics.fillBrush = "#666";
    _graphics.drawDonut(300, 0, 255, 260, 0, 2 * Math.PI, false);

    for (var i = 0; i < data.dataset.length; i++) {
        var currentValue = data.dataset[i];
        var currentLabel = data.labels[i];
        var endAngle = currentAngle + (currentValue * ratio);
        var hue = colorShift * i;
        var rgb = hsvToRgb(hue / 360, 0.8, 1);

        _graphics.strokeBrush = "white";
        _graphics.strokeWidth = 1;
        _graphics.fillBrush = rgb;

        _graphics.drawPie(300, 0, 253, currentAngle * degToRad, endAngle * degToRad, false);

        var y = (i * textOffset) - textTranslation;

        _graphics.strokeBrush = null;
        _graphics.fillBrush = "#666";
        _graphics.drawRectangle(620, y, 30, 30);
        _graphics.fillBrush = "white";
        _graphics.drawRectangle(624, y + 4, 22, 22);
        _graphics.fillBrush = rgb;
        _graphics.drawRectangle(627, y + 7, 16, 16);

        _graphics.fillBrush = "#444";
        _graphics.drawText(655, y + 15, currentLabel + ": " + currentValue);

        currentAngle = endAngle;
    }


}

function draw() {

    _graphics.strokeBrush = null;
    _graphics.clear();

    var transform = new Cgx.Transform();

    transform.translationX = 0;
    transform.translationY = _canvas.height / 2;
    _graphics.pushTransform(transform);

    drawPieChart(_data);

    //var data;

    //transform.translationX = -150;
    //transform.translationY = 0;
    //_graphics.pushTransform(transform);
    //data = {
    //    stepsCount: 10, dotRadius: 10, dotOffset: 14, startSaturation: 1, startValue: 0,
    //    valueStepHandler: (stepsCount, step, value) => value + (1 / stepsCount)
    //};
    //drawColorWheel(
    //    data.stepsCount, data.dotRadius, data.dotOffset, data.startSaturation, data.startValue,
    //    data.saturationStepHandler,
    //    data.valueStepHandler
    //);
    //_graphics.popTransform();



    _graphics.popTransform();
}