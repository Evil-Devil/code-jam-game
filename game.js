var engine = new Engine("gameCanvas");
engine.init();

var ctx = engine.getContext();
var gfx = new Gfx(ctx);

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
    gfx.drawQuad(100, 100, 100, 100);
}