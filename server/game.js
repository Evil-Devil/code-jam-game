module.exports.states = {
    INIT: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4
};

module.exports = function(io) {
    var that = this;
    var playerList = [];

    return {
        addPlayer: function(player) {
            playerList.push(player);
            console.log("Player registered to game");
        },
        removePlayer: function(player) {
            var index = playerList.indexOf(player);
            if (index != -1) {
                playerList.splice(index, 1);
            }
        }
    };
};
