var Lobby = function() {

    var that = {};
    var players = [];
    var readyPlayers = [];
    var currentPlayer = null;

    that.setCurrentPlayer = function(player) {
        currentPlayer = player;
    }
    that.currentPlayer = function() {
        return currentPlayer;
    }

    that.getPlayers = function() {
        return players;
    };

    that.getNewPlayerIndex = function() {
        return players.length;
    };

    that.onPlayerAdded = null;

    that.addPlayer = function(player) {
        if (players.indexOf(player) != -1) {
            throw 'player already added';
        }

        if (that.onPlayerAdded != null) {
            that.onPlayerAdded(player);
        }

        players.push(player);
        readyPlayers.push(false);

        console.log('new player count ' + players.length);
    };

    var removePlayerAt = function(index) {
        var playerIndex = players[index].getIndex();

        players.splice(index, 1);
        readyPlayers.splice(index, 1);

        if (that.onPlayerRemoved != null) {
            that.onPlayerRemoved(playerIndex);
        }
    };

    that.onPlayerRemoved = null;

    that.removePlayer = function(player) {
        var index = players.indexOf(player);
        if (index != -1) {
            removePlayerAt(index);
        }
    };

    that.removePlayerWithIndex = function(playerIndex) {
        var index = -1;
        for (var i = 0; i < players.length; i++) {
            if (players[i].getIndex() == playerIndex) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            removePlayerAt(index);
        }
    };

    that.getPlayer = function (playerIndex) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].getIndex() == playerIndex) {
                return players[i];
            }
        }
        return null;
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
