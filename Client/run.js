

const CanvWIDTH = 800;
const CanvHEIGHT = 380;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var playerIndex = 0;

var mouseClickPos = {
    "x" : 0,
    "y" : 0
}

c.width = CanvWIDTH;
c.height = CanvHEIGHT;

var ballImg = new Image;
ballImg.src = "ball.png";


//this is the world object pretty much everyhting is kept in here
world = {
    "map" : {
        "x" : 0,
        "size" : {
            "x" : 2000,
            "y" : CanvHEIGHT
        }
    },
    "players" : [],
    "objects" : {
        "foreground": [

        ],
        "backround" : [
            
        ]
    }
};

//connection and handling the server connections
function connectToServer() {
    
}

startServerConnectionFile();
startGameFile();
startDisplayFile();
startKeycheckFile();
declareObjects();
//this runs at around 60fps
var tick = setInterval(() => {
    //youll find this in game.js
    updateLogic();

    //youll also find this in game.js
    runGame();

    //youll find this in serverConnection.js
    sendPlayerDataToServer();

    //youll find this in display.js
    updateScreen();
}, 16);

//getting mouse possition here and it stops...
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    mouseClickPos.x = event.clientX - rect.left;
    mouseClickPos.y = event.clientY - rect.top;
}

let canvasElem = document.querySelector("canvas");
canvasElem.addEventListener("mousedown", function(e)
{
    getMousePosition(canvasElem, e);
});
//... here