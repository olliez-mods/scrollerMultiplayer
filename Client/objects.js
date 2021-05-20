var DefObj = {
    "x" : 0,
    "y" : 0,
    "velX" : 0,
    "velY" : 0,
    "hasGravity" : false,
    "collide" : false,
    "onCollide" : function() {},
    "skin" : {
        "source" : "objectSprites/default.png",
        "height" : 30,
        "width" : 30
    },
    "hitbox" : {
        "height" : 0,
        "width" : 0
    }
}

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

var DefPlyr = {
    "x" : 0,
    "y" : 0,
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
        
    }
};


function declareObjects() {
  //  var addplayer = JSON.parse(JSON.stringify(DefPlyr));
 //   world.players.push(addplayer);
}