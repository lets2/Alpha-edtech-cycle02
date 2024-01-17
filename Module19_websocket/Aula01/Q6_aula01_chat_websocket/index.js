let colorList = ["purple", "blue", "darkgreen", "red", "darkorange"];

let socket = new WebSocket("ws://localhost:2020");

const sendButton = document.querySelector("#send-button");
const inputMessage = document.querySelector("#message");

sendButton.addEventListener("click", () => {
    if (inputMessage.value !== "") {
        const message = inputMessage.value;
        socket.send(message);
    }
});

//prevent default form behavior
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const message = inputMessage.value;
    socket.send(message);
});

socket.onmessage = function (event) {
    let receivedMessageText = event.data;

    const messageObj = JSON.parse(receivedMessageText);

    const messageContainerElem = document.createElement("div");

    const username = messageObj.owner;
    let content = messageObj.content;
    switch (messageObj.type) {
        case "joined":
            messageContainerElem.innerHTML = `<span>${username}</span> ${content}`;
            break;
        case "typed":
            messageContainerElem.innerHTML = `<span>${username}:</span> ${content}`;
            break;
        case "left":
            messageContainerElem.innerHTML = `<span>${username}</span> ${content}`;
            break;
    }

    const spanElement = messageContainerElem.querySelector("span");

    const id = Number(messageObj.id);
    // apply a especific color to username
    colorQuantity = colorList.length;
    spanElement.style.color = colorList[id % colorQuantity];

    // adding new message element above the oldest ones
    document.querySelector("#messages").prepend(messageContainerElem);
};
