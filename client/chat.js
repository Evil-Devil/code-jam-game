var Chat = function(chatFormId, chatInputId, socket) {

    var that = {};

    var fadeOutDuration = 5000;

    var socket = socket;
    var chatBoxForm = document.getElementById(chatFormId);
    var chatInputField = document.getElementById(chatInputId);

    var lastMessages = [];

    chatBoxForm.onsubmit = function() {
        var message = chatInputField.value.trim();
        if (message.length == 0) return false;

        socket.emit(MessageTypes.CHAT_MESSAGE, message);
        chatInputField.value = '';
        return false;
    };
    socket.on(MessageTypes.CHAT_MESSAGE, function (message) {
        pushMessage(message);
    });

    var pushMessage = function (message) {
        lastMessages.push({'message': message, 'timestamp': Date.now()});
        if (lastMessages.length > 5) {
            lastMessages.shift();
        }
    };

    that.draw = function (gfx, x, y) {
        var currentTime = Date.now();

        for (var i = 0, il = lastMessages.length; i < il; i++) {
            var transparency = 1 - (currentTime - lastMessages[i].timestamp) / fadeOutDuration;
            if (transparency <= 0) {
                lastMessages.splice(i, 1);
                i--;
            } else {
                gfx.fontSize('12px');
                gfx.write(x, y + i * 15,  'rgba(0, 0, 0, ' + transparency + ')', lastMessages[i].message);
            }
        }
    };

    return that;
};