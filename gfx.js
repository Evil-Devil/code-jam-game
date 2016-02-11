var Gfx = function (context) {
    var that = {};
    var ctx = context;

    that.drawLine = function (x1, y1, x2, y2) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    that.drawQuad = function (x, y, width, height) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(x, y, width, height);
    }
    that.drawCircle = function (x, y, radius) {
    }

    return that;
}