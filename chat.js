var Chat = function(chatFormId, chatInputId, socket, messageCallback) {

    var that = {};
    var chatBoxForm = document.getElementById(chatFormId);
    var chatInputField = document.getElementById(chatInputId);

    chatBoxForm.submit(function() {
        socket.emit('chat message', chatInputField.val());
    });
    socket.on('chat message', messageCallback);
};