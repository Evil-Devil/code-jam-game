var Gfx = function (context) {
    var that = {};
    var ctx = context;

    var fontFamily = 'Verdana';

    that.fontSize = function(size) {
        ctx.font = size + ' ' + fontFamily;
    };

    that.drawLine = function (x1, y1, x2, y2) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    that.drawQuad = function (x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
    that.drawCircle = function (x, y, radius, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.arc(x, y, radius, 0, 360, false)
        ctx.fill();
    }
    that.write = function(x, y, color, text) {
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    return that;
}