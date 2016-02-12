var Marketplace = function() {
    var that = {};
    var position = new Position();
    var width = 50;
    var height = 50;
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

    that.draw = function(gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(100, 100, 25, '#FF0000');
        gfx.write(86, 110, '#000', "M");
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
