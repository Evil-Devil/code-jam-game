var Marketplace = function(player) {
    var player = player;
    var that = {};
    var position = new Position();
    var width = 150;
    var height = 150;
    var boundary = new Boundary()
    var stock = [];
    showStock = false;

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
        if (showStock) {
            that.drawStock(gfx);
        }
    }
    that.drawStock = function(gfx) {
        gfx.fontSize('18px');

        for (var i= 0;i<that.getStock().length; i++) {
            var msg = that.getStock()[i].name + " " + that.getStock()[i].price + " EURO";
            gfx.write(position.x, position.y + (i*20), '#00ff00', msg);
        }
    }
    that.click = function(e) {

        if (!boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }

        // call server for list :)
        player.getSocket().emit(MessageTypes.MARKET_STOCK_REQUEST, player.getName() + " requested stocklist");
        player.getSocket().on(MessageTypes.MARKET_STOCK_RESPONSE, function(stocklist) {
            stock = stocklist;
            showStock = true;
        })
    }
    return that;
}
module.exports = Marketplace;
