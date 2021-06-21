// 4 rows 4 cols for the sprite sheet hero-4
const rows = 4;
const cols = 4;

// tracks which rows corresponds to which direction on sprite sheet
let trackRight = 2;
let trackLeft = 1;
let trackUp = 3;
let trackDown = 0;

// calc to figure out size of a single frame
const spriteWidth = 256;
const spriteHeight = 256;
let width = spriteWidth / cols;
let height = spriteHeight / rows;

// will be used to cycle throught the frames
let curXFrame = 0; // start on left side
let frameCount = 4; // 4 frames per row

// x and y coordinates of the overall sprite image to get the single frame we want
let srcX = 0; // our image has no borders or other stuff
let scrY = 0;

// Determines which direction character is moving
let left = false;
let right = false;
let up = false;
let down = false;

// for slowing animation in update()
let counter = 1;

let gameOver = false;


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
heroImage.src = "images/hero-4.png";

// Monster image
var vaccineReady = false;
var vaccineImage = new Image();
vaccineImage.onload = function () {
    vaccineReady = true;
};
vaccineImage.src = "images/syringe.png";

// Monster image
var maskReady = false;
var maskImage = new Image();
maskImage.onload = function () {
    maskReady = true;
};
maskImage.src = "images/mask.png";

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
var vaccine = {
    // for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var mask = {
    // for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};


 let virusObject = function (pX, pY) {
   this.x=pX;
   this.y=pY;
}
let virusArray=[];
   
var immunityLevel = 0;

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
    //let gg = false;
    for(i=0;i<virusArray.length;i++){
        if( who.x<=(virusArray[i].x+40)&&
            virusArray[i].x<=(who.x+35)&&
            who.y<=(virusArray[i].y+45)&&
            virusArray[i].y<=(who.y+50)) 
        {
            console.log("touched virus");
            return true;
        }
    }
    return false;
}

// Update game objects
var update = function (modifier) {

    console.log("in the update() start...");
    console.log("hero.x = " + hero.x );
    console.log("hero.y = " + hero.y );
    // clear the last image position and assume the character is not moving left or right
    ctx.clearRect(hero.x, hero.y, width, height);

    console.log("in the update() after clearRect...");
    console.log("hero.x = " + hero.x );
    console.log("hero.y = " + hero.y );

    left = false;
    right = false;
    up = false;
    down = false;

    // there is a bug when starting game over. hero.y value is modified here even when button is not pressed
    if (38 in keysDown && hero.y > 20) { //  holding up key
        console.log("up ---> hero.y = " + hero.y)
        hero.y -= hero.speed * modifier;
        console.log("up +++> hero.y = " + hero.y)
        up = true;
    }
    if (40 in keysDown && hero.y < canvas.height - (64 + 30)) { //  holding down key
        console.log("down ---> hero.y = " + hero.y)
        hero.y += hero.speed * modifier;
        console.log("down +++> hero.y = " + hero.y)
        down = true;
    }
    if (37 in keysDown && hero.x > (15)) { // holding left key
        console.log("left ---> hero.x = " + hero.x)
        hero.x -= hero.speed * modifier;
        console.log("left +++> hero.x = " + hero.x)
        left = true; // for animation
    }
    if (39 in keysDown && hero.x < canvas.width - (64 + 18)) { // holding right key
        console.log("right ---> hero.x = " + hero.x)
        hero.x += hero.speed * modifier;
        console.log("right +++> hero.x = " + hero.x)
        right = true; // for animation
    }

    // do the frame logic here for directional movement
    // slow down animation
    if(counter == 6){ // adjust this to change "walking speed" of animation
        curXFrame = ++curXFrame % frameCount; // updating the sprite frame index
                                                // it will count 0,1,2,3... using %
                                                // increment frame rate every 6th time to slow down animation
        counter = 0;
    } else {
        counter++;
    }

    srcX = curXFrame * width; // calc the X coordinate for the spritesheet
    // pick Y dimension of the correct row for the spritesheet
    if(left) {
        scrY = trackLeft * height;
    }

    if(right){
        scrY = trackRight * height;
    }

    if(up){
        scrY = trackUp * height;
    }

    if(down){
        scrY = trackDown * height;
    }

    // this will pick the most neutral image when not moving
    if(left == false && right == false && up == false && down == false){
        srcX = 0 * width;
        scrY = 0 * height;
    }

    console.log("in the update() end...");
    console.log("hero.x = " + hero.x );
    console.log("hero.y = " + hero.y );
    
    // check time 30 seconds
    if (sw.elapsedTime() < 31){
        // Are they touching?
        if (
            (hero.x <= (vaccine.x + 45)
            && vaccine.x <= (hero.x + 45)
            && hero.y <= (vaccine.y + 45)
            && vaccine.y <= (hero.y + 45)) ||
            (hero.x <= (mask.x + 50)
            && mask.x <= (hero.x + 50)
            && hero.y <= (mask.y + 50)
            && mask.y <= (hero.y + 50)) 
        ) {
            ++immunityLevel;       // keep track of our “score”
    
            if(immunityLevel>9){
                gameOver=true;
                endGame();
                //alert("You won!");

                //clearInterval(gametimer);
                //endGame();
            }
            else{
                console.log("in the update() for reset()");
                reset();       // start a new cycle
            }
        }
    }
    else {
        gameOver = true;
        endGame();
        //alert("Time Up! You lost!");
    }


    let count=0;
    if(touchingVirus(hero)){
        count++;      
        alert("You have caught Virus! Game Over!")
        gameOver=true;  
        endGame();
    }
};




// Let's play this game!


var main = function () {
    var now = Date.now();
    var delta = now - then;   
        update(delta / 1000);
        render();
        then = now;
        //  Request to do this again ASAP
        if(!gameOver){
            requestAnimationFrame(main);  
        }
};
//moving virus on screen every second
setInterval(displayVirus, 1000);


// Draw everything in the main render function
var render = function () {
    if (bgReady1) {
        // console.log('here2');
        ctx.drawImage(bgImage1, 0, 0);
    }

    if (bgReady2) {
        // console.log('here2');
        ctx.drawImage(bgImage2, 32, 32);
    }

    if(heroReady){
        ctx.drawImage(heroImage, srcX, scrY, width, height, hero.x, hero.y, width, height);
    }

    if (vaccineReady) {
        ctx.drawImage(vaccineImage, vaccine.x, vaccine.y);
    }
    if (maskReady) {
        ctx.drawImage(maskImage, mask.x, mask.y);
    }

    if(virusReady){ 
        for( i=0;i<virusArray.length;i++){
            ctx.drawImage(virusImage,virusArray[i].x,virusArray[i].y);
            // console.log("virus" +i+virusArray[i].x)
        }
        // }
         
    }
        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Your Immunity Level: " + immunityLevel + " | " + "Time: " + sw.elapsedTime(), 0, 0);
        //ctx.fillText("Your Immunity Level: " + immunityLevel, 0, 0);
        //ctx.fillText("Time:"+Date.now(),700,0);
    
}

function endGame(){
    if(immunityLevel > 9 && sw.elapsedTime() < 31){
        alert("You won!");
    }

    if(sw.elapsedTime() > 30){
        alert("Time Up! You lost!");
    }

    let again=prompt("Do you  want to play again? Type 'Y' or 'N'");
    if(again=="Y"||again=='y'){
        sw.stop();
        sw.reset();
        gameOver = false;
        console.log("reset() in endGame()");
        reset();
        console.log("hero.x = " + hero.x);
        console.log("hero.y = " + hero.y);
        start();  
    }
    else {
        gameOver = true;
        alert("See you next time!");
    }
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
    vaccine.x = 32+ (Math.random() * (canvas.width - 128));
    vaccine.y =32 + (Math.random() * (canvas.height - 128));
    if(!touchingVirus(vaccine)){
        notGood=false;
    }
    }
 notGood=true;
    while(notGood){
        mask.x = 32+ (Math.random() * (canvas.width - 128));
        mask.y =32 + (Math.random() * (canvas.height - 128));
        if(!touchingVirus(mask)&&!touchingOther(mask,vaccine)){
            notGood=false;
        }
        }

        displayVirus();
    
};

function displayVirus(){
    let x=0;
    let y=0;
    let virus={
        x:0,
        y:0
    }
    virusArray=[];
        do
        {
            virus.x=32+ (Math.random() * (canvas.width - 128));
            virus.y=32+ (Math.random() * (canvas.width - 128));
            if(!touchingOther(hero,virus)&&!touchingOther(mask,virus)&&!touchingOther(vaccine,virus)){
                virusArray.push(new virusObject(virus.x,virus.y));
            }
            
        }while(virusArray.length<5);

    }

function touchingOther(who,whom){
    if(
    who.x <= (whom.x + 64)
    && whom.x <= (who.x + 64)
    && who.y <= (whom.y + 64)
    && whom.y <= (who.y + 64)
    ){
        return true;
    }
    else{
        return false;
    }
}
// let gametimer;

function StopWatch() {
    let startTime,
        endTime,
        isRunning = false,
        time,
        duration = 0;
    
    this.start = function () {
        if (isRunning) throw new Error("StopWatch has already been started.");

        isRunning = true;

        startTime = new Date();
    };
    
    this.stop = function () {
        if (!isRunning) throw new Error("StopWatch has already been stop.");
    
        isRunning = false;
    
        endTime = new Date();
    
        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
    };
    
    this.reset = function () {
        duration = 0;
        startTime = null;
        endTime = null;
        isRunning = false;
    };

    this.elapsedTime = function(){
        time = new Date();
        // use getTime() instead of getSeconds because it will produce a negative value
        return (time.getTime() - startTime.getTime()) / 1000;
    }

    this.restart = function(){
        this.stop();
        this.reset();
        this.start();
    }
    
    Object.defineProperty(this, "duration", {
        get: function () {
            return duration;
        },
    });
}
    
const sw = new StopWatch();

let then;
function start(){

    sw.start();
    console.log("isRunning : " + sw.isRunning);
    // if(!sw.isRunning){
    //     sw.start();
    // }
    // else {
    //     sw.restart();
    // }
    // console.log("duration : " + sw.duration);
    


    then = Date.now();
    alert("You have 30 seconds to gain improve your immunity to 10 without contracting Virus!")
    immunityLevel=0;
    //var start=Date.now();
    reset();
    console.log("in the start()...");
    console.log("hero.x = " + hero.x);
    console.log("hero.y = " + hero.y);
    main();  // call the main game loop.
    //setTimeout(endGame,30000); // 30 seconds
}
 start();
// var then=Date.now();
// reset();
//  main();  // call the main game loop.
