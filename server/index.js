var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mime = require('mime-types');
var url = require('url');
var fs = require('fs');

global.MessageTypes = require('./../shared/messageTypes.js');
global.Position = require('./../shared/position.js');

var lobby = require('../shared/lobby.js')();
lobby.onPlayerAdded = function (player) {
    var players = lobby.getPlayers();
    for (var i = 0; i < players.length; i++) {
        player.getSocket().emit(MessageTypes.USER_CONNECTED, players[i].getIndex());
        player.getSocket().emit(MessageTypes.PLAYER_NAME_SET + players[i].getIndex(), players[i].getName());

        players[i].getSocket().emit(MessageTypes.USER_CONNECTED, player.getIndex());
        players[i].getSocket().emit(MessageTypes.PLAYER_NAME_SET + player.getIndex(), player.getName());
    }
};
lobby.onPlayerRemoved = function (playerIndex) {
    var players = lobby.getPlayers();
    for (var i = 0; i < players.length; i++) {
        players[i].getSocket().emit(MessageTypes.USER_DISCONNECTED, playerIndex);
    }
};

var Game = require('./game.js')(lobby);
var Player = require('../shared/player.js');

var chat = require('./chat.js')(lobby);

app.get('/', function (request, response) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
    });
});

var outputFile = function (request, response) {
    var pathname = url.parse(request.url, true).pathname;
    fs.readFile(__dirname + '/..' + pathname, function (err, data) {
        if (err == undefined) {
            response.writeHeader(200, {"Content-Type": mime.lookup(pathname)});
            response.write(data);
            response.end();
        } else {
            response.writeHeader(404);
            response.end();
        }
    });
};

app.get('/client/*', outputFile);
app.get('/shared/*', outputFile);

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('user connected');

    var player = new Player(lobby.getNewPlayerIndex(), socket);
    player.onNameChanged = function(name) {
        socket.broadcast.emit(MessageTypes.PLAYER_NAME_SET + player.getIndex(), name);
    };

    socket.on(MessageTypes.PLAYER_NAME_SET, function (playerName) {
        player.setName(playerName);
        console.log('name of player with id ' + player.getIndex() + ' to ' + playerName);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        chat.removePlayer(player);
        lobby.removePlayer(player);

        Game.removePlayer(player);
    });

    chat.addPlayer(player);
    lobby.addPlayer(player);

    Game.setupPlayer(player);
});