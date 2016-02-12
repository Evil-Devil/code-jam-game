
var Workshop = function (id, gameObjects, lobby) {
    var that = {};

    var width = 120;
    var height = 120;

    var gameObjects = gameObjects;

    var showButton = false;

    that.position = new Position();
    that.owner = null;
    that.id = id;

    that.getBoundary = function () {
        return new Boundary(that.position.x, that.position.y, width, height);
    };

    that.setPosition = function(x, y) {
        that.position = new Position(x, y);
    };

    that.click = function (e) {
        if (that.owner != lobby.currentPlayer()) {
            return;
        }

        if (showButton) {
            showButton = false;

            if (that.getBoundary().isWithin(e.layerX, e.layerY)) {
                var boundary = that.getBoundary();
                //move transport to marketplace
                var marketplacePos = gameObjects.getMarketplace().getPosition();
                var transports = gameObjects.getTransportsOfPlayer(lobby.currentPlayer().index);
                for (var i = 0; i < transports.length; i++) {
                    var transportPos = transports[i].position;
                    if (boundary.isWithin(transportPos.x, transportPos.y)) {
                        transports[i].setDestination(marketplacePos.x, marketplacePos.y);
                    }
                }
            }
        } else {
            if (that.getBoundary().isWithin(e.layerX, e.layerY)) {
                showButton = true;
            }
        }
    };

    that.draw = function (gfx, engine) {
        var boundary = that.getBoundary();

        gfx.drawImageScaled(boundary.getLeft(), boundary.getTop(), boundary.getWidth(), boundary.getHeight(), engine.getImage('haus.png'));

        if (showButton) {
            gfx.fontSize('18px');
            gfx.write(boundary.getLeft(), boundary.getTop(), '#000000', 'to marketplace');
        }
    };

    return that;
};
module.exports = Workshop;