const socket = io();

socket.on("message", message => {
    // Message that is emitted only to the user that
    // connected to app
    socket.emit("message", "Welcome to ChatCord!");

    // Broadcast when a user connects. That means the message is
    // sent to everyone on chat except the user that is connecting.
    socket.broadcast.emit("message", "A user has joined chat!");

    // Sends the message to everyone including the user that is
    // connecting to app.
    // ---- io.emit("message", "")

    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat!");
    });
});