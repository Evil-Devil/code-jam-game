var HUD = function(chat) {
    var that = {};
    var chat = chat;

    function drawChatWindow(gfx) {
        gfx.drawOuadOutline(2, 502, 1020, 96, 4, '#BF8C45');
        gfx.drawQuad(4, 504, 1016, 92, 'rgba(245,185,100,0.5)');

        gfx.fontSize('24px');
        chat.draw(gfx, 5, 517);
    }


    that.draw = function(gfx) {
        gfx.restore();
        drawChatWindow(gfx);

    }
    return that;
}