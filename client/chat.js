var Chat = function(chatFormId, chatInputId) {

    var that = {};

    var fadeOutDuration = 5000;

    var socket = io();
    var chatBoxForm = document.getElementById(chatFormId);
    var chatInputField = document.getElementById(chatInputId);

    var lastMessages = [];

    chatBoxForm.onsubmit = function() {
        socket.emit('chat message', chatInputField.value);
        chatInputField.value = '';
        return false;
    };
    socket.on('chat message', function (message) {
        lastMessages.push({'message': message, 'timestamp': Date.now()});
    });

    that.draw = function (gfx) {
        var currentTime = Date.now();
        for (var i = 0; i < lastMessages.length; i++) {
            var transparency = 1 - (currentTime - lastMessages[i].timestamp) / fadeOutDuration;
            if (transparency <= 0) {
                lastMessages.splice(i, 1);
                i--;
            } else {
                gfx.write(0, 100 + i * 30, 'rgba(0, 0, 0, ' + transparency + ')', lastMessages[i].message);
            }
        }
    };

    return that;
};