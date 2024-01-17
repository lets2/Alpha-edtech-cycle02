let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

//send message from form
document.forms.publish.onsubmit = function () {
    let outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

// receive message
socket.onmessage = function (event) {
    let message = event.data;

    let messageElem = document.createElement("div");
    messageElem.textContent = message;
    document.querySelector("#messages").prepend(messageElem);
};
