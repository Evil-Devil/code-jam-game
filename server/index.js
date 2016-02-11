var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mime = require('mime-types');
var url = require('url');
var fs = require('fs');

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

//processing websockets
var userNumber = 0;
io.on('connection', function(socket){
    console.log('user ' + userNumber + ' connected');
    (function (userNumber) {
        io.emit('user connected', 'User ' + userNumber + ' connected');
        socket.on('disconnect', function () {
            console.log('user ' + userNumber + ' disconnected');
        });
        socket.on('chat message', function(msg){
            console.log('message from user ' + userNumber + ': ' + msg);
            io.emit('chat message', 'User ' + userNumber + ': ' + msg);
        });
    })(userNumber);
    userNumber++;
});