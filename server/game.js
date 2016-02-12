
var Workshop = require('../shared/workshop.js');
var Market = require('../shared/marketplace.js');
var Good = require('../shared/good.js');
var GameObjects = require('../shared/gameObjects.js');

module.exports.states = {
    INIT: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4
};

module.exports = function(lobby, io) {
    var that = this;
    var lobby = lobby;
    var io = io;
    var gameObjects = new GameObjects();

    var possibleWorkshopPositions = [
        {
            x: 700,
            y: 100
        },
        {
            x: 600,
            y: 400
        },
        {
            x: 200,
            y: 400
        },
        {
            x: 750,
            y: 250
        }
    ];
    var remainingWorkshopPositions = possibleWorkshopPositions.slice(0);

    var highestTransportId = 0;
    var market = null;

    that.initMarket = function() {
        market = new Market();
        market.addToStock(new Good('Grain', 3, 100));
        market.addToStock(new Good('Wood', 2, 100));
        market.addToStock(new Good('Metal', 6, 100));
        market.addToStock(new Good('Wool', 2, 100));

        /*io.getSocket().on(MessageTypes.MARKET_STOCK_REQUEST, function(msg) {
            console.log(msg);
        });*/
        gameObjects.setMarketplace(market);
    }

    var getTransport = function (id) {
        var allTransports = gameObjects.getAllTransports();
        for (var i = 0; i < allTransports.length; i++) {
            if (allTransports[i].id == id) {
                return allTransports[i];
            }
        }
        throw 'received move for non existent transporter';
    };

    that.setupPlayer = function (player) {
        var workshop = new Workshop();

        var workshopPositionIndex = Math.floor(Math.random() * remainingWorkshopPositions.length);
        var workshopPosition = remainingWorkshopPositions[workshopPositionIndex];
        remainingWorkshopPositions.splice(workshopPositionIndex, 1);

        if (remainingWorkshopPositions.length == 0) {
            remainingWorkshopPositions = possibleWorkshopPositions.slice(0);
        }

        workshop.setPosition(workshopPosition.x, workshopPosition.y);
        workshop.owner = player;

        var allWorkshops = gameObjects.getAllWorkshops();
        for (var i = 0; i < allWorkshops.length; i++) {
            player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, allWorkshops[i]);
        }

        gameObjects.addWorkshop(workshop);

        console.log(workshop);

        /* ==============================================================================
         *  MARKETPLACE CALLBACK LOGIC
         */
        player.getSocket().on(MessageTypes.MARKET_STOCK_REQUEST, function(msg) {
            player.getSocket().emit(MessageTypes.MARKET_STOCK_RESPONSE, market.getStock());
        });

        /* ==============================================================================
         *  WORKSHOP CALLBACK LOGIC
         */
        player.getSocket().broadcast.emit(MessageTypes.CREATE_WORKSHOP, workshop);
        player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, workshop);

        /* ==============================================================================
         *  TRANSPORT CALLBACK LOGIC
         */
        var transport = new Transport(highestTransportId++);
        transport.position = workshop.position;
        transport.owner = player;

        player.getSocket().broadcast.emit(MessageTypes.CREATE_TRANSPORT, transport);
        player.getSocket().emit(MessageTypes.CREATE_TRANSPORT, transport);

        var allTransports = gameObjects.getAllTransports();
        for (var i = 0; i < allTransports.length; i++) {
            player.getSocket().emit(MessageTypes.CREATE_TRANSPORT, allTransports[i]);
        }

        gameObjects.addTransport(transport);

        player.getSocket().on(MessageTypes.MOVE_TRANSPORT, function (movementObj) {
            var transporter = getTransport(movementObj.id);
            transporter.position = movementObj.position;

            player.getSocket().broadcast.emit(MessageTypes.MOVE_TRANSPORT, movementObj);
        });
    };

    that.removePlayer = function (player) {
        var allWorkshops = gameObjects.getAllWorkshops();
        for (var i = 0; i < allWorkshops.length; i++) {
            if (allWorkshops.owner == player) {
                player.getSocket().broadcast.emit(MessageTypes.DESTROY_WORKSHOP, workshop);
            }
        }
    }

    return that;
};
