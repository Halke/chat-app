const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log("User: " + username + " & Room: " + room);

const socket = io();

// Join room
socket.emit("joinRoom", {username, room});

// Message from server
socket.on("message", message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Get room and users
socket.on("roomUsers", ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get message text
    const message = e.target.elements.msg.value;

    // Emitting a message to the server
    socket.emit("chatMessage", message);

    // Clear the input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span>
        </p>
        <p class="text">
            ${message.text}
        </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
};