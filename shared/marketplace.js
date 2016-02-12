var Marketplace = function(player) {
    var player = player;
    var that = {};
    var position = new Position();
    var width = 150;
    var height = 150;
    var boundary = new Boundary()
    var stock = [];
    var showStock = false;
    var stockBoundary = new Boundary(512, 250, 649, 425);

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

    that.getPosition = function () {
        return position;
    };

    that.buy = function () {
        console.log("you bought goods");
    };

    that.sell = function() {
        console.log("you sold goods");
    };

    that.draw = function(gfx, engine) {
        gfx.drawImageScaled(boundary.getLeft(), boundary.getTop(), boundary.getWidth(), boundary.getHeight(), engine.getImage('markt.png'));
        if (showStock) {
            that.drawStock(gfx);
        }
    }
    that.drawStock = function(gfx) {
        gfx.fontSize('18px');
        var localStock = that.getStock();

        var x = stockBoundary.getLeft() + 41;
        var y = stockBoundary.getTop() + 60;
        var r = 0;
        var c = 0;
        gfx.drawImage(stockBoundary.getLeft(), stockBoundary.getTop(),engine.getImage('ui_markt.png'));
        for (var i= 0, il=localStock.length; i<il; i++) {
            if (i > 0 && i % 2 == 0) c++;
            if (r >= 2) r=0;
            //var msg = that.getStock()[i].name + " " + that.getStock()[i].price + " EURO";
            //gfx.write(position.x, position.y + (i*20), '#00ff00', msg);
            //console.log(localStock[i].name + '.png');
            gfx.drawImage(x + (r * 153), y + (c * 183), engine.getImage(localStock[i].name.toLowerCase() + '.png'));
            r++;
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
    that.clickStock = function(e) {

    }
    that.clickStockClose = function(e) {
        if (!showStock) return;
    }
    return that;
}
module.exports = Marketplace;
