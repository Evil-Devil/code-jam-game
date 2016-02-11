var HUD = function(chat) {
    var that = {};
    var chat = chat;

    function drawChatWindow(gfx) {
        gfx.drawQuad(0, 500, 1024, 100, '#000');
        gfx.drawQuad(2, 502, 1020, 96, '#CECECE');

        gfx.fontSize('24px');
        chat.draw(gfx, 5, 517);
    }


    that.draw = function(gfx) {
        drawChatWindow(gfx);

    }
    return that;
}