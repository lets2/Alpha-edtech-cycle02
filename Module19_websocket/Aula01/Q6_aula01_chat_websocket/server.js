const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const {
    uniqueNamesGenerator,
    colors,
    animals,
} = require("unique-names-generator");

const app = express();

const port = 2020;
const host = "localhost";

let usersId = {};
let count = 0;
app.use(express.static("./"));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

const clients = new Set();

const wss = new WebSocket.Server({ noServer: true }); // wss = websocket server

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

wss.on("connection", (ws) => {
    const newRandomName = uniqueNamesGenerator({
        dictionaries: [colors, animals],
    });
    //add a username to our new client
    ws.username = newRandomName;
    setColorToUsername(ws.username);

    sendMessage(ws.username, "joined", "entrou!");
    clients.add(ws); // add new websocket

    ws.on("message", function (message) {
        sendMessage(ws.username, "typed", message.toString());
    });

    ws.on("close", function () {
        clients.delete(ws);

        sendMessage(ws.username, "left", "saiu!");
    });
});

function setColorToUsername(username) {
    usersId[username] = count;
    count++;
}

function sendMessage(username, type, content) {
    for (let client of clients) {
        const message = {
            owner: username,
            id: usersId[username],
            type: type,
            content: content,
        };
        client.send(JSON.stringify(message));
    }
}
