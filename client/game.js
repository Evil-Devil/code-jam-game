// game objects
var Good = function(name) {
    var that = {};
    var name = name;

    that.getName = function() {
        return name;
    };

    return that;
}

var Marketplace = function() {
    var that = {};
    var position = new Position();
    var width = 50;
    var height = 50;
    var boundary = new Boundary()

    that.setPosition = function(x, y) {
        position = new Position(x,y);
        boundary = new Boundary(x,y, width, height);
    }

    that.buy = function () {
        console.log("you bought goods");
    };

    that.sell = function() {
        console.log("you sold goods");
    };

    that.draw = function(gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(100, 100, 25, '#FF0000');
        gfx.write(86, 110, '#000', "M");
    }
    that.click = function(e) {

        if (!boundary.isWithin(e.layerX, e.layerY)) {
            return false;
        }
        console.log('clicked marketplace');
    }
    return that;
}

var Transport = function () {
    var that = {};
    var position = new Position();
    var destination = null;
    var velocity = 0.25;
    var owner = null;

    that.setOwner = function(player) {
        owner = player;
    }


    function move(delta) {

        var distance = Math.sqrt(Math.pow(destination.x-position.x,2)+Math.pow(destination.y-position.y,2));
        var distX = (destination.x - position.x) / distance;
        var distY = (destination.y - position.y) / distance;

        position.x += (distX  * velocity * delta);
        position.y += (distY * velocity * delta);

        if (Math.sqrt(Math.pow(destination.x-position.x,2)+Math.pow(destination.y-position.y,2)) >= distance) {
            destination = null;
            //console.log("destination reached");
            return;
        }
    }

    that.click = function(e) {
        destination = new Position(e.layerX, e.layerY);
        //console.log(destination);
        if (null !== owner) {
            owner.pay(10);
        }
    }

    that.setPosition = function(x, y) {
        position = new Position(x,y);
    };

    that.setDestination = function (x, y) {
        destination = new Position(x,y);
    };

    that.update = function(delta) {
        if (null !== destination) {
            move(delta);
        }
    }

    that.draw = function (gfx) {
        gfx.fontSize('21px');
        gfx.drawCircle(position.x, position.y, 15, '#0000FF');
        gfx.write(position.x - 10.5, position.y + 9, '#FFF', "T");
    };

    return that;

}

var Workshop = function (x, y) {
    var that = {};
    var position = new Position();

    that.setPosition = function(x, y) {
        position = new Position(x,y);
    };

    that.draw = function (gfx) {
        gfx.fontSize('32px');
        gfx.drawCircle(position.x, position.y, 25, '#FFFF00');
        gfx.write(position.x - 16, position.y + 11, '#FFF', "W");
    };

    return that;
}


// game logic
// ==================================================
var engine = new Engine("gameCanvas");
engine.init();


var lastFrameTimeMs = 0;
var maxFPS = 60;
var delta = 0;
var timestep = 1000 / 60;

var ctx = engine.getContext();
var gfx = new Gfx(ctx);
var mouse = engine.getMouse();
var socket = io();
var lobby = new Lobby();

var player = new Player(-1, socket);
player.onNameChanged = function (name) {
    socket.emit(MessageTypes.PLAYER_NAME_SET, name);
};
player.setName("TestUser" + Math.random().toString(36).substring(2, 5));

lobby.setCurrentPlayer(player);

var market = new Marketplace();
market.setPosition(100, 100);

var workshop = new Workshop();
workshop.setPosition(700, 100);

var transport = new Transport();
transport.setPosition(500,500);
transport.setOwner(player);

var chat = new Chat('chatBox', 'messageField', socket);
var hud = new HUD(engine, chat, lobby);


// register objects for events
engine.registerListener('click', transport.click);
engine.registerListener('click', market.click);

socket.emit('test', 'some message');

socket.on(MessageTypes.USER_CONNECTED, function (playerIndex) {
    var player = new Player(playerIndex, socket);
    lobby.addPlayer(player);

    socket.on(MessageTypes.PLAYER_NAME_SET + playerIndex, function (name) {
        player.setName(name);
    });

    console.log('player connected. current players count: ' + lobby.getPlayers().length);
});

socket.on(MessageTypes.USER_DISCONNECTED, function(playerIndex) {
    lobby.removePlayerAt(playerIndex);

    console.log('player disconnected. current players count: ' + lobby.getPlayers().length);
});

// draw something ...
function gameLoop(timestamp) {
    // Throttle the frame rate.
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= timestep) {
        updateLogic(timestep);
        delta -= timestep;
    }
    drawGraphics();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function updateLogic(delta) {
    //console.log(mouse.lastClickPosition(), mouse.position());
    //if (mouse.lastClickPosition() != mouse.position()) {
    //    console.log("not equal");
    //    transport.setDestination(mouse.lastClickPosition().x, mouse.lastClickPosition().y);
    //}
    transport.update(delta);
}

function drawGraphics() {
    gfx.clear(engine.getCanvas().width,engine.getCanvas().height);
    market.draw(gfx);
    workshop.draw(gfx);
    transport.draw(gfx);
    chat.draw(gfx);
    hud.draw(gfx);
}

function drawHUD(gfx) {
    var outText = "" + player.getName() + " | Money: " + player.getMoney();
    gfx.fontSize('24px');
    gfx.write(100, 50, '#00FF00', outText);

    var players = lobby.getPlayers();
    //console.log(players.length);
    var startY = 50;
    for (p in players) {
        outText = "" + players[p].getName() + " | Money: " + players[p].getMoney();
        gfx.write(400, startY, '#ff0000', outText);
        startY += 25;
    }

}