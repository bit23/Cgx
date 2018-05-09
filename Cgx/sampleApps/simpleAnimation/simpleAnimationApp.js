

var _graphics;
var _transform;
var _infoBox;

window.addEventListener("DOMContentLoaded", () => {

    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    document.body.appendChild(canvas);

    _infoBox = document.createElement("div");
    _infoBox.style.backgroundColor = "rgba(0,0,0,0.5)";
    _infoBox.style.color = "white";
    _infoBox.style.position = "fixed";
    _infoBox.style.left = "0";
    _infoBox.style.top = "0";
    _infoBox.style.padding = "5px";
    document.body.appendChild(_infoBox);

    _graphics = new Cgx.CoreGraphics(canvas);
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
var _y = 200;
var _hue = 0;
var _angle = 0;
var _hueDegreePerSecond = 45;
var _degreePerSecond = 360;
var _anglePerSecond = 180;

function createAnimation() {

    _renderLoop = new Cgx.RenderLoop(animate);
    //_renderLoop.maxFps = 30;
    _renderLoop.start();

    moveDown();
}

function moveDown() {
    _renderLoop.animate(
        _y, 400, 1500, "quinticIn",
        function (v) {
            _y = v;
        },
        function () {
            moveUp();
        }
    );
}

function moveUp() {
    _renderLoop.animate(
        _y, 200, 1500, "cubicOut",
        function (v) {
            _y = v;
        },
        function () {
            moveDown();
        }
    );
}



function animate(args) {

    _graphics.clear();

    _angle += (args.deltaTime / 1000) * _anglePerSecond;
    _angle %= 360;

    _hue += (args.deltaTime / 1000) * _hueDegreePerSecond;
    _hue %= 360;
    var color = hsvToRgb(_hue / 360, 1, 0.5);
    
    _graphics.setFillBrush([color[0], color[1], color[2], 0.4]);
    _graphics.drawDonut(200, _y, 100, 200, 0, 2 * Math.PI, false, _transform);

    _graphics.setFillBrush(color);
    _graphics.drawDonut(200, _y, 100, 200, -Math.PI / 2, (-Math.PI / 2) - (_angle * (Math.PI / 180)), true, _transform);

    var rotation = (args.deltaTime / 1000) * _degreePerSecond;
    _transform.rotation += rotation;

    printInfo(args);
}

function printInfo(loopArgs) {

    var buffer = [];

    buffer.push("<div><b>FPS</b> <span>" + loopArgs.instance.currentFps + "</span></div>");
    buffer.push("<div><b>deltaTime</b> <span>" + loopArgs.deltaTime + "</span></div>");

    _infoBox.innerHTML = buffer.join("");
}