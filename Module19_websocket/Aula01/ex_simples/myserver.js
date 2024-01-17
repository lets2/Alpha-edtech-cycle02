const http = require("http");
const ws = new require("ws");
const wss = new ws.Server({ noServer: true }); // wss = websocket server

const clients = new Set();

http.createServer((req, res) => {
    // aqui lidamos apenas com conexões de websocket
    // em um projeto real, teríamos algum outro código aqui para lidar com solicitações que não sejam de websocket
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
    clients.add(ws);

    ws.on("message", function (message) {
        message = message.slice(0, 50); // o comprimento máximo da mensagem será 50

        for (let client of clients) {
            client.send(message);
        }
    });

    ws.on("close", function () {
        clients.delete(ws);
    });
}
