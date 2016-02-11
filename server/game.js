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


/*
var game = {
    players: [],
    gameState: GameState.INIT,


};

var gameStart = function(io) {
    io.on('connection', function(socket) {
        socket.on('test', function(msg) {
           var player = new Player();
        });
    });
}

module.exports = function (io) {
    that = this,

    io.on('connection', function (socket) {
        socket.on('test', function(msg) {
            player = new Player();
            player.setName(msg);
            player.setMoney(5000);
            that.players.push(player);
        });
    })
};
*/