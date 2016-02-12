var Workshop = function (x, y) {
    var that = {};
    var position = new Position();

    that.setPosition = function(x, y) {
        position = new Position(x,y);
    };

    that.draw = function (gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(position.x, position.y, 25, '#FFFF00');
        gfx.write(position.x - 16, position.y + 11, '#FFF', "W");
    };

    return that;
}