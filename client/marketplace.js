var Marketplace = function() {
    var that = {};
    var position = new Position();
    var width = 50;
    var height = 50;
    var boundary = new Boundary()

    that.setPosition = function(x, y) {
        position = new Position(x,y);
        boundary = new Boundary(x,y, width, height);
    }

    that.buy = function () {
        console.log("you bought goods");
    };

    that.sell = function() {
        console.log("you sold goods");
    };

    that.draw = function(gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(100, 100, 25, '#FF0000');
        gfx.write(86, 110, '#000', "M");
    }
    that.click = function(e) {

        if (!boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        console.log('clicked marketplace');
    }
    return that;
}
