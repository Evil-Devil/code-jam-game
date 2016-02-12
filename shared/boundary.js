var Boundary = function (x, y, width, height) {
    var that = {
        x1: x - (width / 2 || 0),
        y1: y - (height / 2 || 0),
        x2: x + (width / 2 || 0),
        y2: y + (height / 2 || 0)
    };

    that.getTop = function () {
        return that.y1;
    };

    that.getLeft = function () {
        return that.x1;
    };

    that.getWidth = function () {
        return that.x2 - that.x1;
    };

    that.getHeight = function () {
        return that.y2 - that.y1;
    };

    that.isWithin = function (x, y) {
        if (x >= that.x1 && x <= that.x2 && y >= that.y1 && y <= that.y2) {
            return true;
        }
        return false;
    }
    return that;
}
module.exports = Boundary;