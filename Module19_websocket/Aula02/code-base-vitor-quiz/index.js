// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use("/", express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000");
});
