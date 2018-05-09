
var _canvas;
var _graphics;
var _transform;
var _infoBox;

window.addEventListener("DOMContentLoaded", () => {

    _canvas = document.createElement("canvas");
    _canvas.width = 800;
    _canvas.height = 600;
    _canvas.style.width = _canvas.width + "px";
    _canvas.style.height = _canvas.height + "px";
    document.body.appendChild(_canvas);

    _infoBox = document.createElement("div");
    _infoBox.style.backgroundColor = "rgba(0,0,0,0.5)";
    _infoBox.style.color = "white";
    _infoBox.style.position = "fixed";
    _infoBox.style.left = "0";
    _infoBox.style.top = "0";
    _infoBox.style.padding = "5px";
    document.body.appendChild(_infoBox);

    _graphics = new Cgx.CoreGraphics(_canvas);
    _graphics.setStrokeBrush(null);
    _transform = new Cgx.Transform();
    //_transform.originX = 100;
    //_transform.originY = 100;

    createAnimation();
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

var _renderLoop;
var _hue = 0;
var _hueDegreePerSecond = 45;
var _dotRadius = 20;


var _p;
var _dotAnimator;


function createAnimation() {

    var p0 = {
        x: _canvas.width / 2,
        y: _canvas.height / 2
    };

    var p1 = {
        x: (Math.random() * (_canvas.width - _dotRadius)) + _dotRadius * 0.5,
        y: (Math.random() * (_canvas.height - _dotRadius)) + _dotRadius * 0.5
    };

    _p = {
        x: p0.x,
        y: p0.y
    };

    _renderLoop = new Cgx.RenderLoop(draw);
    //_renderLoop.maxFps = 30;
    _renderLoop.start();

    _dotAnimator = _renderLoop.createAnimator(
        p0, p1, 1500, "expoInOut",
        function (v) {
            _p = v;
        },
        function () {
            _dotAnimator.startValue = {
                x: _p.x,
                y: _p.y
            };
            _dotAnimator.endValue = {
                x: (Math.random() * (_canvas.width - (_dotRadius * 2))) + _dotRadius,
                y: (Math.random() * (_canvas.height - (_dotRadius * 2))) + _dotRadius
            };
            _dotAnimator.restart();
        }
    );
    _renderLoop.addAnimator(_dotAnimator, false);

    _dotAnimator.start();

    //moveDown();
}



function draw(args) {

    _graphics.clear();

    _hue += (args.deltaTime / 1000) * _hueDegreePerSecond;
    _hue %= 360;
    var color = hsvToRgb(_hue / 360, 1, 0.5);
    
    _graphics.setFillBrush([color[0], color[1], color[2], 0.4]);
    _graphics.drawCircle(_p.x, _p.y, 20);

    printInfo(args);
}

function printInfo(loopArgs) {

    var buffer = [];

    buffer.push("<div><b>FPS</b> <span>" + loopArgs.instance.currentFps + "</span></div>");
    buffer.push("<div><b>deltaTime</b> <span>" + loopArgs.deltaTime + "</span></div>");

    _infoBox.innerHTML = buffer.join("");
}