
var StockOverlay = function () {

    var that = {};

    var closeBoundary = new Boundary(791,92,30,30);
    var stockBoundary = new Boundary(512, 250, 649, 425);
    var buttonBoundary = new Boundary(742, 413, 128, 40);
    var visible = false;

    that.onButtonClick = null;

    that.clickClose = function(e) {
        if (!visible || !closeBoundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        visible = false;
    };

    return that;
};