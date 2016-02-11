
module.exports = function(lobby) {
    var lobby = lobby;

    var players = [];

    return {
        addPlayer: function (player) {
            players.push(player);

            player.getSocket().on(MessageTypes.CHAT_MESSAGE, function(message){
                console.log('message from user ' + player.getName() + ': ' + message);
                player.getSocket().emit(MessageTypes.CHAT_MESSAGE, 'User ' + player.getName() + ': ' + message);
            });
        },
        removePlayer: function (player) {
            var playerIndex = players.indexOf(player);
            if (playerIndex != -1) {
                players.splice(playerIndex, 1);
            }

            console.log('player left lobby');
        }
    };
};

