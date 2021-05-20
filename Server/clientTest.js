const io = require("socket.io-client");

var socket = io.connect("http://localhost:3000");

socket.on("newIndex", (data) => {
    console.log(data);
});

socket.on("worldObj", (data) => {
    console.log(data.string);
});

socket.emit("hi", "room");

