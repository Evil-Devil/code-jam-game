var HUD = function(chat, player) {
    var that = {};
    var chat = chat;
    var plaer = player;

    var borderColor = '#BF8C45';
    var textColor = '#000';

    function drawChatWindow(gfx) {
        gfx.drawOuadOutline(2, 502, 1020, 96, 4, borderColor);
        gfx.drawQuad(4, 504, 1016, 92, 'rgba(245,185,100,0.5)');

        gfx.fontSize('24px');
        chat.draw(gfx, 5, 517);
    }
    function drawPlayerInfo(gfx) {
        gfx.fontSize('14px');
        gfx.drawOuadOutline(2, 2, 140, 26, 4, borderColor);
        gfx.write(8, 20, textColor, player.getName());
        gfx.drawOuadOutline(142, 2, 140, 26, 4, borderColor);
        gfx.write(148, 20, textColor, player.getMoney() + " \u20AC");
    }


    that.draw = function(gfx) {
        gfx.restore();
        drawChatWindow(gfx);
        drawPlayerInfo(gfx);
    }


    return that;
}