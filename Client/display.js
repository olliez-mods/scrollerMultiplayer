

//this will run after runFile has so you can get glo variables in here
// remember not to put var/let in front of variables so you can use them in the updateScreen function
function startDisplayFile(){

plyerImgDir = "./playerSprites/";

//c is the canvas element
ctx = c.getContext("2d");
}
//this will run 60 times per second
//display and screen refresh goes here
function updateScreen(){

    //clearing the screen dont ptu anything before this as it will be cleard
    ctx.clearRect(0, 0, CanvWIDTH, CanvHEIGHT); 

    //drawing the map
    ctx.drawImage(backroundImg, 0, 0, CanvWIDTH, CanvHEIGHT);

    //looping through all the players to render them
    world.players.forEach(playerObj => {
        if(playerObj.connection.state == "c"){
            var tempImg = new Image;
            tempImg.src = `${plyerImgDir}${playerObj.skin.number}.png`;
            ctx.drawImage(tempImg, playerObj.x, playerObj.y, playerObj.skin.width, playerObj.skin.height);

            //displaying chat on different box sizes
            if(playerObj.chat.isChatting){
                ctx.font = "20px Courier New";
                ctx.fillStyle = "#f2f2f2";
                ctx.fillRect(playerObj.x + world.players[playerIndex].skin.width/2 - playerObj.chat.msg.length*6, playerObj.y - 40, 5 + playerObj.chat.msg.length*12  ,30);
                ctx.fillStyle = "#000000";
                ctx.fillText(playerObj.chat.msg, playerObj.x + (world.players[playerIndex].skin.width/2 - playerObj.chat.msg.length*6) + 2, playerObj.y - 20);
            }
        }
    });

    world.objects.forEach(obj => {
        var tempImg = new Image;
        tempImg.src = `${obj.skin.source}`;
        ctx.drawImage(tempImg, obj.x, obj.y, obj.skin.width, obj.skin.height);
    });
    if(world.players[playerIndex].chat.isChatting){
        ctx.drawImage(youSignImg, world.players[playerIndex].x + world.players[playerIndex].skin.width/2 - 15 , world.players[playerIndex].y - 80, 30, 30)
    }else{
        ctx.drawImage(youSignImg, world.players[playerIndex].x + world.players[playerIndex].skin.width/2 - 15 , world.players[playerIndex].y - 40, 30, 30);
    }
}