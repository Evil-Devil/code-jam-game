
var Workshop = function () {
    var that = {};

    that.position = new Position();
    that.owner = null;

    that.setPosition = function(x, y) {
        that.position = new Position(x,y);
    };

    that.draw = function (gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(that.position.x, that.position.y, 25, '#FFFF00');
        gfx.write(that.position.x - 16, that.position.y + 11, '#FFF', "W");
    };

    return that;
};
module.exports = Workshop;