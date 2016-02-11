var Chat = function(chatFormId, chatInputId) {

    var that = {};

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
        lastMessages.push(message);
    });

    that.draw = function (gfx) {
        for (var i = 0; i < lastMessages.length; i++) {
            gfx.write(0, 100 + i * 30, '#000000', lastMessages[i]);
        }
    };

    return that;
};