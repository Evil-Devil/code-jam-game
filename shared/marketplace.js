var Marketplace = function(player) {
    var player = player;
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
        gfx.drawCircle(position.x, position.y, 25, '#FF0000');
        gfx.write(position.x - 13, position.y + 10, '#000', "M");
    }
    that.click = function(e) {

        console.log("M Click: ", e.layerX, e.layerY)
        if (!boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }

        // call server for list :)
        player.getSocket().emit(MessageTypes.MARKET_STOCKLIST, player.getName() + " requested stocklist");
        console.log('requesting stock ...');



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
