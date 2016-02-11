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

    that.buy = function() {
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

var Workshop = function() {

}




// game logic
// ==================================================
var engine = new Engine("gameCanvas");
engine.init();

var ctx = engine.getContext();
var gfx = new Gfx(ctx);

var market = new Marketplace();


// draw something ...
function gameLoop() {

    updateLogic();
    drawGraphics();

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function updateLogic() {

}

function drawGraphics() {
    market.draw(gfx);
}