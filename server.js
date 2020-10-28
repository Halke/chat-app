const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when the client connects
io.on("connection", socket => {
    console.log("New WS connection...");

    socket.emit("message", "Welcome to ChatCord!");
});

const port = 3000 || process.env.PORT;

server.listen(port, () => console.log(`Server running on port: ${port}`));