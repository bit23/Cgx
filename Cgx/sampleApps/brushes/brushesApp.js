

var _canvas;
var _graphics;

window.addEventListener("DOMContentLoaded", () => {

    _canvas = document.createElement("canvas");
    _canvas.width = 800;
    _canvas.height = 300;
    _canvas.style.width = _canvas.width + "px";
    _canvas.style.height = _canvas.height + "px";

    document.body.appendChild(_canvas);

    _graphics = new Cgx.CoreGraphics(_canvas);

    draw();
});


function draw() {

    _graphics.setStrokeBrush(null);

    var transform = new Cgx.Transform();

    transform.translationX = 50;
    transform.translationY = 50;

    var linearBrush = new Cgx.LinearGradientBrush();
    linearBrush.x0 = 0;
    linearBrush.y0 = 0;
    linearBrush.x1 = 0;
    linearBrush.y1 = 200;
    linearBrush.addColorStop(0, "cyan");
    linearBrush.addColorStop(1, "blue");
    _graphics.setFillBrush(linearBrush);
    _graphics.drawRectangle(0, 0, 200, 200, transform);

    
    transform.translationX = 300;
    transform.translationY = 50;

    var radialBrush = new Cgx.RadialGradientBrush();
    radialBrush.x0 = 100;
    radialBrush.y0 = 100;
    radialBrush.r0 = 0;
    radialBrush.x1 = 100;
    radialBrush.y1 = 100;
    radialBrush.r1 = 200;
    radialBrush.addColorStop(0, "cyan");
    radialBrush.addColorStop(1, "blue");
    _graphics.setFillBrush(radialBrush);
    _graphics.drawRectangle(0, 0, 200, 200, transform);


    transform.translationX = 550;
    transform.translationY = 50;

    var img = new Image();
    img.src = "https://www.google.it/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
    img.onload = function () {
        var patternBrush = new Cgx.PatternBrush();
        patternBrush.image = img;
        patternBrush.repetition = "repeat";
        _graphics.setFillBrush(patternBrush);
        _graphics.drawRectangle(0, 0, 200, 200, transform);
    };

}