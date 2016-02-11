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

    that.setPosition = function(x, y) {
        //position.x = x;
        //position.y = y;

        that.position = new Position(x,y);
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

    return that;
}

var Transport = function () {
    var that = {};
    var position = new Position();
    var destination = null;

    that.setPosition = function(x, y) {
        position.x = x;
        position.y = y;
        //position = new Position(x,y);
    };

    that.move = function (x, y, speed) {
        //if (null === destination) return;
        position.x += 5;

    };

    that.draw = function (gfx) {
        gfx.fontSize('21px');
        gfx.drawCircle(position.x, position.y, 15, '#0000FF');
        gfx.write(position.x - 10.5, position.y + 9, '#FFF', "W");
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
        gfx.write(position.x - 16, position.y + 11, '#FFF', "T");
    };

    return that;
}


// game logic
// ==================================================
var engine = new Engine("gameCanvas");
engine.init();

var ctx = engine.getContext();
var gfx = new Gfx(ctx);
var mouse = engine.getMouse();

var socket = io();

var market = new Marketplace();
market.setPosition(100, 100);
var workshop = new Workshop();
workshop.setPosition(700, 100);
var transport = new Transport();
transport.setPosition(400, 100);
transport.setPosition(600, 100);
var chat = new Chat('chatBox', 'messageField', socket, function(message) {
    gfx.write(0, 0, '#ff0000', message);
});


// draw something ...
function gameLoop() {
    updateLogic();
    drawGraphics();

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function updateLogic() {
    //console.log(mouse.position().x, mouse.position().y);
    transport.setPosition(mouse.position().x, mouse.position().y);
    //transport.move(0,0,0);
}

function drawGraphics() {
    gfx.clear(engine.getCanvas().width,engine.getCanvas().height);
    market.draw(gfx);
    workshop.draw(gfx);
    transport.draw(gfx);
}