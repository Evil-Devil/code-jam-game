
var Workshop = function () {
    var that = {};

    var width = 120;
    var height = 120;

    that.position = new Position();
    that.owner = null;

    that.getBoundary = function () {
        return new Boundary(that.position.x, that.position.y, width, height);
    };

    that.setPosition = function(x, y) {
        that.position = new Position(x,y);
    };

    that.draw = function (gfx, engine) {
        var boundary = that.getBoundary();

        gfx.drawImageScaled(boundary.getLeft(), boundary.getTop(), boundary.getWidth(), boundary.getHeight(), engine.getImage('client/haus.png'));
    };

    return that;
};
module.exports = Workshop;