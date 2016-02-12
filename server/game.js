
var Workshop = require('../shared/workshop.js');

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

    var allWorkshops = [];

    that.setupPlayer = function (player) {
        var workshop = new Workshop();

        var workshopPositionIndex = Math.floor(Math.random() * possibleWorkshopPositions.length);
        var workshopPosition = possibleWorkshopPositions[workshopPositionIndex];
        possibleWorkshopPositions.splice(workshopPositionIndex, 1);

        workshop.setPosition(workshopPosition.x, workshopPosition.y);
        workshop.owner = player;

        for (var i = 0; i < allWorkshops.length; i++) {
            player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, allWorkshops[i]);
        }

        allWorkshops.push(workshop);

        console.log(workshop);

        player.getSocket().broadcast.emit(MessageTypes.CREATE_WORKSHOP, workshop);
        player.getSocket().emit(MessageTypes.CREATE_WORKSHOP, workshop);
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
