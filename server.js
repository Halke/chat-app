const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));


const botName = "ChatCord Bot";

// Run when the client connects
io.on("connection", socket => {

    socket.on("joinRoom", ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Message that is emitted only to the user that
        // connected to app
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

        // Broadcast when a user connects. That means the message is
        // sent to everyone on chat except the user that is connecting.
        socket.broadcast.emit("message", formatMessage(botName, "A user has joined the chat!"));
    });

    // Sends the message to everyone including the user that is
    // connecting to app.
    // ---- io.emit("message", "")

    // Listen for chat message
    socket.on("chatMessage", (message) => {
        io.emit("message", formatMessage("USER", message));
    });

    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName, "A user has left the chat!"));
    });
});

const port = 3000 || process.env.PORT;

server.listen(port, () => console.log(`Server running on port: ${port}`));