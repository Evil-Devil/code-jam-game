var Marketplace = function(player, gameObjects) {
    var player = player;
    var that = {};
    var position = new Position();
    var width = 150;
    var height = 150;
    var boundary = new Boundary()
    var stock = [];
    var showStock = false;
    var stockBoundaries = [];
    var uiBoundary = new Boundary(512, 250, 649, 425);
    var closeBoundary = new Boundary(791,92,30,30);
    var buyBoundary = new Boundary(667 + 63, 402 + 17, 126, 34);
    var stockDrawIndex = -1;

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

        var x = uiBoundary.getLeft() + 41;
        var y = uiBoundary.getTop() + 60;
        var r = 0;
        var c = 0;
        gfx.drawImage(uiBoundary.getLeft(), uiBoundary.getTop(),engine.getImage('ui_markt.png'));
        for (var i= 0, il=localStock.length; i<il; i++) {
            if (i > 0 && i % 2 == 0) c++;
            if (r >= 2) r=0;
            //var msg = that.getStock()[i].name + " " + that.getStock()[i].price + " EURO";
            //gfx.write(position.x, position.y + (i*20), '#00ff00', msg);
            //console.log(localStock[i].name + '.png');
            gfx.drawImage(x + (r * 153), y + (c * 183), engine.getImage(localStock[i].name.toLowerCase() + '.png'));

            if (typeof stockBoundaries[i] == 'undefined') {
                stockBoundaries[i] = new Boundary(x + 10 + 65 + (r * 153),  y - 8 + 66 + (c * 183), 130, 132);
            }
            r++;
        }
        if (stockDrawIndex > -1) {
            gfx.drawQuad(stockBoundaries[stockDrawIndex].getLeft(), stockBoundaries[stockDrawIndex].getTop(), 130, 132, 'rgba(255,255,0,0.2')
        }
        // write out transport stock
        var transporter = gameObjects.getTransportsOfPlayer(player.getIndex())[0];
        var c = 0;
        for (var i=0; i<transporter.stock.length; i++) {
            if (typeof transporter.stock[i] == 'undefined') {
                continue;
            }
            c++;
            gfx.write(x + 300, y + (c * 20), '#0000FF', transporter.stock[i].name + ": " + transporter.stock[i].amount);
        }
    }
    that.click = function(e) {
        if (showStock || !boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }

        // call server for list :)
        player.getSocket().emit(MessageTypes.MARKET_STOCK_REQUEST, player.getName() + " requested stocklist");
        player.getSocket().on(MessageTypes.MARKET_STOCK_RESPONSE, function(stocklist) {
            stock = stocklist;
            showStock = true;
        })
    }

    that.clickStockBuy = function(e) {
        if (!showStock || !buyBoundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        showStock = false;
        var workshop = gameObjects.getWorkshopsOfPlayer(player.getIndex())[0].position;
        gameObjects.getTransportsOfPlayer(player.getIndex())[0].setDestination(workshop.x, workshop.y);

    }
    that.clickStockClose = function(e) {
        if (!showStock || !closeBoundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        showStock = false;
    }
    that.clickStockGoods = function(e) {
        if (!showStock) return false;
        for (var i= 0, il=stockBoundaries.length; i<il; i++) {
            if (stockBoundaries[i].isWithin(e.layerX, e.layerY)) {
                stockDrawIndex = i;
                break;
            }
        }
        var transporter = gameObjects.getTransportsOfPlayer(player.getIndex())[0];
        if (typeof transporter.stock[stockDrawIndex] == 'undefined') {
            transporter.stock[stockDrawIndex] = stock[stockDrawIndex];
            transporter.stock[stockDrawIndex].amount = 0;
        }
        transporter.stock[stockDrawIndex].amount++;


    }
    return that;
}
module.exports = Marketplace;
