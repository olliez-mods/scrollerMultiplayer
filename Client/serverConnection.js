//this will run after runFile has so you can get global variables in here
// remember not to put var/let in front of variables so you can use them elsewhere
function startServerConnectionFile() {


    canStart = false;
    const io = require("socket.io-client");
    socket = io.connect("http://69.120.243.251:3443");

    socket.on("newIndex", (data) => {
        playerIndex = parseInt(data);
    });

    socket.on("worldObj", (data) => {
        world = data;
    });

    socket.on("getPlayers", (playerArray) => {
        playerArray[playerIndex] = world.players[playerIndex];
        world.players = playerArray;
    });

    socket.on("getObjects", (objectArray) => {
        if(playerIndex != 0){
        world.objects = objectArray;
    }
    });

    socket.on("currentWorld", (data) => {
        world = data;
        canStart = true;
    });


}

function sendPlayerDataToServer() {
    if(canStart){
        socket.emit("playerUpdate", {
            "player" : world.players[playerIndex],
            "index" : playerIndex
        });
    }
}

function updateObjects() {
    socket.emit("objectsUpdate", world.objects);
}