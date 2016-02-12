
var Workshop = require('../shared/workshop.js');
var Market = require('../shared/marketplace.js');

module.exports.states = {
    INIT: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4
};

module.exports = function(lobby) {
    var that = this;
    var lobby = lobby;

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
            x: 500,
            y: 250
        }
    ];
    var remainingWorkshopPositions = possibleWorkshopPositions.slice(0);

    var allWorkshops = [];
    var allTransports = [];
    var highestTransportId = 0;
    var market = null;

    function initMarket() {
        market = new Market();
        console.log("market initialized");
    }

    that.init = function() {
        initMarket();
    }

    var getTransport = function (id) {
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

        for (var i = 0; i < allWorkshops.length; i++) {
            player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, allWorkshops[i]);
        }

        allWorkshops.push(workshop);

        console.log(workshop);

        player.getSocket().broadcast.emit(MessageTypes.CREATE_WORKSHOP, workshop);
        player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, workshop);

        var transport = new Transport(highestTransportId++);
        transport.position = workshop.position;
        transport.owner = player;

        player.getSocket().broadcast.emit(MessageTypes.CREATE_TRANSPORT, transport);
        player.getSocket().emit(MessageTypes.CREATE_TRANSPORT, transport);

        for (var i = 0; i < allTransports.length; i++) {
            player.getSocket().emit(MessageTypes.CREATE_TRANSPORT, allTransports[i]);
        }

        allTransports.push(transport);

        player.getSocket().on(MessageTypes.MOVE_TRANSPORT, function (movementObj) {
            var transporter = getTransport(movementObj.id);
            transporter.position = movementObj.position;

            player.getSocket().broadcast.emit(MessageTypes.MOVE_TRANSPORT, movementObj);
        });
    };

    that.removePlayer = function (player) {
        for (var i = 0; i < allWorkshops.length; i++) {
            if (allWorkshops.owner == player) {
                player.getSocket().broadcast.emit(MessageTypes.DESTROY_WORKSHOP, workshop);
            }
        }
    }

    return that;
};
