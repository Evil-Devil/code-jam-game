var Marketplace = function() {
    var that = {};
    var position = new Position();
    var width = 150;
    var height = 150;
    var boundary = new Boundary()
    var stock = [];

    that.addToStock = function(good) {
        stock.push(good);
    }

    that.getStock = function() {
        return stock;
    }

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

    that.draw = function(gfx, engine) {
        gfx.drawImageScaled(boundary.getLeft(), boundary.getTop(), boundary.getWidth(), boundary.getHeight(), engine.getImage('client/markt.png'));
    }
    that.click = function(e) {

        if (!boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        for (var i= 0;i<that.getStock().length; i++) {
            console.log(
                that.getStock()[i].getName() + " " +
                that.getStock()[i].getPrice() + " EURO"
            );
        }
    }
    return that;
}
module.exports = Marketplace;
