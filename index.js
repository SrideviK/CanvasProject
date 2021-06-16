// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

// Background image
var bgReady1 = false;
var bgImage1 = new Image();
bgImage1.onload = function () {
    bgReady1 = true;
};
bgImage1.src = "images/redbackground.png";

var bgReady2 = false;
var bgImage2 = new Image();
bgImage2.onload = function () {
    bgReady2 = true;
};
bgImage2.src = "images/desert-background.png";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero-2.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/syringe.png";

// virus image
var virusReady = false;
var virusImage = new Image();
virusImage.onload = function () {
    virusReady = true;
};
virusImage.src = "images/virus.png";

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
    // for this version, the monster does not move, so just and x and y
        x: 0,
        y: 0
    };


    var virus1 = {
            x: 200,
            y:550
        };
    var virus2 = {
            x: 600,
            y: 250
        };
    var virus3 = {
            x: 300,
            y: 300
        };
    var virus4 = {
            x: 300,
            y: 100
        };
    var vaccinesObtained = 0;

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    //console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    //console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

function touchingVirus(who){
    if
    ((who.x<=(virus1.x+50)&&
            virus1.x<=(who.x+55)&&
            who.y<=(virus1.y+50)&&
            virus1.y<=(who.y+50))
            ||(who.x<=(virus2.x+50)&&
            virus2.x<=(who.x+55)&&
            who.y<=(virus2.y+50)&&
            virus2.y<=(who.y+50))
            ||(who.x<=(virus3.x+50)&&
            virus3.x<=(who.x+55)&&
            who.y<=(virus3.y+50)&&
            virus3.y<=(who.y+50))
            ||(who.x<=(virus4.x+50)&&
            virus4.x<=(who.x+55)&&
            who.y<=(virus4.y+50)&&
            virus4.y<=(who.y+50))
            
            )
            {
        return true;
    }
    else{
        return false;
    }
}

// Update game objects
var update = function (modifier) {

    if (38 in keysDown && hero.y > 32) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (64 + 30)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (30)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (64 + 30)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    
        // Are they touching?
        if (
            hero.x <= (monster.x + 64)
            && monster.x <= (hero.x + 64)
            && hero.y <= (monster.y + 64)
            && monster.y <= (hero.y + 64)
        ) {
            ++vaccinesObtained;       // keep track of our “score”

            if(vaccinesObtained>4){
                alert("You won!");
                gameOver=true;

            }
            else{
                reset();       // start a new cycle
            }


            
        }

        if(touchingVirus(hero)){
            alert("You have caught Virus! Game Over!")
            gameOver=true;        }
    
};




// Let's play this game!


var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};


// Draw everything in the main render function
var render = function () {
    if (bgReady1) {
        // console.log('here2');
        ctx.drawImage(bgImage1, 0, 0);

        // ctx.drawImage(heroImage, 50, 50);
        // ctx.drawImage(monsterImage, 140,100);
    }

    if (bgReady2) {
        // console.log('here2');
        ctx.drawImage(bgImage2, 32, 32);

        // ctx.drawImage(heroImage, 50, 50);
        // ctx.drawImage(monsterImage, 140,100);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if(virusReady){
        ctx.drawImage(virusImage, virus1.x, virus1.y);
         ctx.drawImage(virusImage, virus2.x, virus2.y);
         ctx.drawImage(virusImage, virus3.x, virus3.y);
         ctx.drawImage(virusImage, virus4.x, virus4.y);
    }
        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Vaccines Obtained: " + vaccinesObtained, 0, 0);
    

}

var reset = function () {
    hero.x = (canvas.width / 2)-32;
    hero.y = (canvas.height / 2)-32;

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    // monster.x = 32 + (Math.random() * (canvas.width - 96));
    // monster.y = 32 + (Math.random() * (canvas.height - 96));

    let notGood=true;
    while(notGood){
    monster.x = 32+ (Math.random() * (canvas.width - 128));
    monster.y =32 + (Math.random() * (canvas.height - 128));
    if(!touchingVirus(monster)){
        notGood=false;
    }
    }
};

var then = Date.now();
reset();
main();  // call the main game loop.