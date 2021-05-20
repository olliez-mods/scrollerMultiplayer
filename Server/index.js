const express = require("express");
const app = express();
const PORT = 3443;
const http = require("http").createServer();

const io = require("socket.io")(http);

let world = {
    "map" : {
        "x" : 0,
        "size" : {
            "x" : 2000,
            "y" : 380
        }
    },
    "players" : [],
    "objects" : []
};

var DefPlyr = {
    "x" : 30,
    "y" : 10,
    "velX" : 0,
    "velY" : 0,
    "skin" : {
        "number" : 0,
        "height" : 90,
        "width" : 60
    },
    "name" : "defult",
    "hitbox" : {
        "height" : 90,
        "width" : 60
    },
    "connection" : {
        "state" : "c"
    },
    "chat" : {
        "isChatting" : false,
        "msg" : ""
    }
};

var dropletObj = {
    "x" : 0,
    "y" : 0,
    "velX" : 0,
    "velY" : 0,
    "hasGravity" : true,
    "collide" : false,
    "onCollide" : function() {
        world.players[playerIndex].score ++;
    },
    "skin" : {
        "source" : "objectSprites/droplet.png",
        "height" : 60,
        "width" : 30
    },
    "hitbox" : {
        "height" : 60,
        "width" : 30
    }
}


let players = 0;
let openIndexs = [];

io.on("connection", (socket) => {
    let playerIndex = players;
    if(openIndexs.length > 0){
        playerIndex = openIndexs[0];
        openIndexs.splice(0, 1);
        world.players[playerIndex].connection.state = "c";
    }else{
        players++;
        world.players.push(JSON.parse(JSON.stringify(DefPlyr)));
    }
    socket.emit("newIndex", playerIndex);
    socket.emit("currentWorld", world);


    socket.on("playerUpdate", (playerData) => {
        world.players[playerData.index] =  playerData.player;
    });

    socket.on("objectsUpdate", (worldObjects) => {
        world.objects = worldObjects;
        socket.emit("getObjects", world.objects);
    })

    socket.on('disconnect', function(){
        world.players[playerIndex].connection.state = "d";
        openIndexs.push(playerIndex);
    });


    setInterval(function() {
        socket.emit("getPlayers", world.players);
        socket.emit("getObjects", world.objects);
    }, 15);
});

http.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})