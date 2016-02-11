module.exports.states = {
    INIT: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4
};

module.exports = function(io) {
    var that = this;

    return {
        registerPlayer: function(player) {
            console.log(player);
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