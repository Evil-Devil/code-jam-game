var Lobby = function() {

    var that = {};

    var players = [];
    var readyPlayers = [];

    that.getPlayers = function() {
        return players;
    };

    that.getNewPlayerIndex = function() {
        return players.length;
    };

    that.addPlayer = function(player) {
        if (players.indexOf(player) != -1) {
            throw 'player already added';
        }

        for (var i = 0; i < players.length; i++) {
            player.getSocket().emit(MessageTypes.USER_CONNECTED, i);
            player.getSocket().emit(MessageTypes.PLAYER_NAME_SET + i, players[i].getName());
        }

        players.push(player);
        readyPlayers.push(false);

        console.log('new player count ' + players.length);
    };

    that.removePlayer = function(player) {
        var playerIndex = players.indexOf(player);
        if (playerIndex != -1) {
            that.removePlayerAt(playerIndex);
        }
    };

    that.removePlayerAt = function(playerIndex) {
        players.splice(playerIndex, 1);
        readyPlayers.splice(playerIndex, 1);

        for (var i = 0; i < players.length; i++) {
            players[i].getSocket().emit(MessageTypes.USER_DISCONNECTED, playerIndex);
        }
    };

    that.setPlayerReadyStatus = function(player, status) {
        var playerIndex = readyPlayers.indexOf(player);
        if (playerIndex == -1) {
            throw "can't set player ready status for unknown player";
        }

        readyPlayers[playerIndex] = status;
    };

    that.allPlayersReady = function() {
        if (players.length < 2) {
            return false;
        }

        for (var state in readyPlayers) {
            if (state != true) {
                return false;
            }
        }

        return true;
    };

    return that;
};
module.exports = Lobby;
