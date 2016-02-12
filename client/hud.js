var HUD = function(engine, chat, lobby) {
    var that = {};
    var currentPlayer = lobby.currentPlayer();
    var images = [];

    var borderColor = '#BF8C45';
    var textColor = '#000';
    var moneySign = '\u20AC';

    function drawChatWindow(gfx) {
        gfx.drawOuadOutline(2, 502, 1020, 96, 4, borderColor);
        gfx.drawQuad(4, 504, 1016, 92, 'rgba(245,185,100,0.5)');

        gfx.fontSize('24px');
        chat.draw(gfx, 5, 517);
    }
    function drawPlayerInfo(gfx) {
        gfx.fontSize('14px');
        gfx.drawOuadOutline(2, 2, 140, 26, 4, borderColor);
        gfx.write(8, 20, textColor, currentPlayer.getName());
        gfx.drawOuadOutline(142, 2, 70, 26, 4, borderColor);
        gfx.write(148, 20, textColor, currentPlayer.getMoney() + " " + moneySign);
    }

    function drawOtherPlayersInfo(gfx) {
        var players = lobby.getPlayers();
        if (players.length <= 1) return

        for (var i= 0, il=players.length; i<il; i++) {
            // do not render the actual player!
            if (players[i].getName() == currentPlayer.getName()) {
                continue;
            }
            gfx.drawOuadOutline(402, 2 + (i * 26), 140, 26, 4, borderColor);
            gfx.write(408, 20 + (i * 26), textColor, players[i].getName());
        }
    }

    that.draw = function(gfx) {
        gfx.restore();
        drawChatWindow(gfx);
        drawPlayerInfo(gfx);
        drawOtherPlayersInfo(gfx);
    }


    return that;
}