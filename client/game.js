// game logic
// ==================================================
var engine = new Engine("gameCanvas");
engine.init();
engine.preloader(['client/world_chat.png']);

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

lobby.setCurrentPlayer(player);
lobby.addPlayer(player);

var market = new Marketplace();
market.setPosition(100, 100);

var workshop = new Workshop();
workshop.setPosition(700, 100);

var transport = new Transport();
transport.setPosition(500,500);
transport.setOwner(player);

var chat = new Chat('chatBox', 'messageField', socket);
var hud = new HUD(engine, chat, lobby);

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
engine.registerListener('click', transport.click);
engine.registerListener('click', market.click);

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