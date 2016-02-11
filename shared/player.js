var Player = function(socket) {

    var that = {};
    var name;
    var money = 0;

    socket.on(MessageTypes.PLAYER_NAME_SET, function (playerName) {
        name = playerName;
    });

    that.getName = function() {
        return name;
    };

    that.setName = function(setName) {
        socket.emit(MessageTypes.PLAYER_NAME_SET, setName);
        name = setName;
    };

    that.getMoney = function() {
        return money;
    }

    that.setMoney = function(amount) {
        money = amount;
    }

    that.getSocket = function() {
        return socket;
    };

    return that;
};
module.exports = Player;