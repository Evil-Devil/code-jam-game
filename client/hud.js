var HUD = function(engine, chat, lobby, market) {
    var that = {};
    var currentPlayer = lobby.currentPlayer();
    var market = market;
    var images = {};

    var borderColor = '#BF8C45';
    var textColor = '#000';
    var moneySign = '\u20AC';

    function drawChatWindow(gfx) {

        gfx.drawImage(0, 462, engine.getImage('client/world_chat.png'));
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
        if (players.length <= 1)
            return;

        var drawIndex = 0;
        for (var i= 0, il=players.length; i<il; i++) {
            // do not render the actual player!
            if (players[i] == currentPlayer) {
                continue;
            }
            gfx.drawOuadOutline(402, 2 + (drawIndex * 26), 140, 26, 4, borderColor);
            gfx.write(408, 20 + (drawIndex * 26), textColor, players[i].getName());

            drawIndex++;
        }
    }


    that.draw = function(gfx) {
        if (false === engine.preloaded()) return;
        gfx.restore();
        market.draw(gfx, engine);

        drawChatWindow(gfx);
        drawPlayerInfo(gfx);
        drawOtherPlayersInfo(gfx);


    }

    return that;
}