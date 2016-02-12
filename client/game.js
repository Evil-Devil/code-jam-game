// game logic
// ==================================================
var engine = new Engine("gameCanvas");
engine.init();
engine.preloader(['world_chat.png', 'haus.png', 'markt.png', 'wood.png', 'metal.png', 'grain.png', 'wool.png', 'ui_markt.png']);


var gameObjects = new GameObjects();

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

socket.on(MessageTypes.RECEIVE_USER_ID, function (userId) {
    player.index = userId;
});

lobby.setCurrentPlayer(player);
lobby.addPlayer(player);

var market = new Marketplace(player);
market.setPosition(512, 300);
gameObjects.setMarketplace(market);
// set some goods

var chat = new Chat('chatBox', 'messageField', socket);
var hud = new HUD(engine, chat, lobby, market);

var nameForm = document.getElementById('nameForm');
nameForm.onsubmit = function () {
    nameForm.style.display = 'none';

    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

    var chatForm = document.getElementById('chatBox');
    chatForm.style.display = 'block';

    var userNameInput = document.getElementById('userName');
    player.setName(userNameInput.value);

    return false;
}

// register objects for events
engine.registerListener('click', market.click);
engine.registerListener('click', market.clickStock);

socket.on(MessageTypes.USER_CONNECTED, function (playerIndex) {
    var player = new Player(playerIndex, socket);
    lobby.addPlayer(player);

    socket.on(MessageTypes.PLAYER_NAME_SET + playerIndex, function (name) {
        player.setName(name);
    });

    console.log('player connected. current players count: ' + lobby.getPlayers().length);
});

socket.on(MessageTypes.USER_DISCONNECTED, function(playerIndex) {
    lobby.removePlayerWithIndex(playerIndex);

    console.log('player disconnected. current players count: ' + lobby.getPlayers().length);
});

socket.on(MessageTypes.CREATE_WORKSHOP, function (workshop) {
    console.log('creating workshop');
    console.log(workshop);

    var realWorkshop = new Workshop(workshop.id, gameObjects);
    realWorkshop.position = workshop.position;
    realWorkshop.owner = lobby.getPlayer(workshop.owner.index);

    gameObjects.addWorkshop(realWorkshop);
    engine.registerListener('click', realWorkshop.click);
    console.log(realWorkshop);
});

socket.on(MessageTypes.DESTROY_WORKSHOP, function (workshop) {

    gameObjects.removeWorkshop(workshop.id);
});

socket.on(MessageTypes.DESTROY_TRANSPORT, function (transport) {

    gameObjects.removeTransport(transport.id);
});

socket.on(MessageTypes.MOVE_TRANSPORT, function (movementObj) {
    console.log('received transport for ' + movementObj.id);

    var transporter = gameObjects.getTransport(movementObj.id);
    transporter.position = movementObj.position;
});

socket.on(MessageTypes.CREATE_TRANSPORT, function (transport) {
    var realTransport = new Transport(transport.id);
    realTransport.position = transport.position;
    realTransport.owner = lobby.getPlayer(transport.owner.index);

    /*if (realTransport.owner == lobby.currentPlayer()) {
        engine.registerListener('click', realTransport.click);
    }*/

    gameObjects.addTransport(realTransport);
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

    var transports = gameObjects.getAllTransports();
    for (var i = 0; i < transports.length; i++) {
        transports[i].update(delta);
    }
}

function drawGraphics() {
    gfx.clear(engine.getCanvas().width,engine.getCanvas().height);

    market.draw(gfx, engine);

    var workshops = gameObjects.getAllWorkshops();
    for (var i = 0; i < workshops.length; i++) {
        workshops[i].draw(gfx, engine);
    }
    var transports = gameObjects.getAllTransports();
    for (var i = 0; i < transports.length; i++) {
        transports[i].draw(gfx);
    }
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