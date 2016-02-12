var Boundary = function (x, y, width, height) {
    var x1 = x - (width / 2 || 0);
    var y1 = y - (height / 2 || 0);
    var x2 = x + (width / 2 || 0);
    var y2 = y + (height / 2 || 0);
    var that = {};

    that.isWithin = function (x, y) {
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
            return true;
        }
        return false;
    }
    return that;
}
module.exports = Boundary;