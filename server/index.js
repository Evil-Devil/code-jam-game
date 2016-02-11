var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mime = require('mime-types');
var url = require('url');
var fs = require('fs');

global.MessageTypes = require('./../shared/messageTypes.js');

var Game = require('./game.js')(io);
var Player = require('../shared/player.js');


var lobby = require('../shared/lobby.js')();
var chat = require('./chat.js')(lobby, MessageTypes, io);

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

    var player = new Player(socket);

    io.emit(MessageTypes.USER_CONNECTED, 'User connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
        chat.removePlayer(player);
        lobby.removePlayer(player);
        Game.removePlayer(player);
    });

    chat.addPlayer(player);
    lobby.addPlayer(player);
    Game.addPlayer(player);
});