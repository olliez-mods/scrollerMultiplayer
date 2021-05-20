document.getElementById("chngskin").addEventListener("click", () => {
    skinKey += 2;
    if(skinKey > maxSkinKey){
        skinKey = 0;
    }
    world.players[playerIndex].skin.number = skinKey;
});

/*
document.getElementById("startGame").addEventListener("click", () => {
    if(playerIndex == 0) {
        gameStarted = true;
        addDroplet();
    }else{
        alert("Only the host can start the game");
    }
});
*/

document.getElementById("send").addEventListener("click", () => {
    world.players[playerIndex].chat.msg = document.getElementById("chatText").value;
    world.players[playerIndex].chat.isChatting = true;
    document.getElementById("chatText").value = "";
    setTimeout(() => {
        world.players[playerIndex].chat.isChatting = false;
    }, 3500);
});

function runGame() {
    if(gameStarted && playerIndex == 0){
        world.objects.forEach((obj, index) => {
            obj.y += obj.velY;
            obj.velY += 0.08;

            obj.x += obj.velX;

            if(obj.y > CanvHEIGHT) {
                world.objects.splice(index, 1);
            }
        });
        updateObjects();
    }
}

function addDroplet() {
    world.objects.push(JSON.parse(JSON.stringify(dropletObj)));
}

//this will run after runFile has so you can get global variables in here
// remember not to put var/let in front of variables so you can use them in the updateLogic function
function startGameFile(){
    skinKey = 0;
    maxSkinKey = 6;
    gameStarted = false;
}

//this will run 60 times a seconds
//game logic goes here
function updateLogic(){

    //moveing the player by his velocity
    world.players[playerIndex].x += world.players[playerIndex].velX;
    world.players[playerIndex].y += world.players[playerIndex].velY;


    //key controlls
    if(keysDown.includes("a")) {
        world.players[playerIndex].velX += -0.25; 
        world.players[playerIndex].skin.number = skinKey;}

    if(keysDown.includes("d")) {
        world.players[playerIndex].velX += 0.25; 
        world.players[playerIndex].skin.number = skinKey+1;}

    if(keysDown.includes("w") && world.players[playerIndex].y + world.players[playerIndex].hitbox.height > CanvHEIGHT - 30) {
        world.players[playerIndex].velY = -Math.random()*4 - 5; }


    //movement for objects
    
       world.objects.forEach((o, index) => {
            let p = world.players[playerIndex];
           
            if(p.x + p.hitbox.width > o.x && p.x < o.x + o.hitbox.width &&
               p.y + p.hitbox.height > o.y && p.y < o.y + o.hitbox.height) {
                    world.objects.splice(index, 1);
                    updateObjects();
                    console.log("hi");
            }
       });
       

    //slowing the player down
    world.players[playerIndex].velX = world.players[playerIndex].velX /1.02;

    //checking if the player is hitting a wall (on the X axis) and preventing him from going through
    if(world.players[playerIndex].x + world.players[playerIndex].hitbox.width > CanvWIDTH || world.players[playerIndex].x < 0){
        world.players[playerIndex].x -= world.players[playerIndex].velX;
        world.players[playerIndex].velX = 0;
    }

    //checking if the player is hitting a wall (on the Y axis) and preventing him from going through
    if(world.players[playerIndex].y + world.players[playerIndex].hitbox.height > CanvHEIGHT - 25 || world.players[playerIndex].y < 0){
        world.players[playerIndex].velY = 0;
    }

    //checking if the player is on the ground, if he's not then apply gravity
    if(world.players[playerIndex].y + world.players[playerIndex].hitbox.height > CanvHEIGHT - 25){
        world.players[playerIndex].velY = 0;
        world.players[playerIndex].y = CanvHEIGHT - world.players[playerIndex].hitbox.height - 25;
    }else{
        world.players[playerIndex].velY += 0.2;
    }
    
}