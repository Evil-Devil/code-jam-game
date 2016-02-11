var Chat = function(chatFormId, chatInputId, socket, messageCallback) {

    var that = {};
    var chatBoxForm = $(chatFormId);
    var chatInputField = $(chatInputId);

    chatBoxForm.submit(function() {
        socket.emit('chat message', chatInputField.val());
    });
    socket.on('chat message', messageCallback);
};