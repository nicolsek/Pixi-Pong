var width = 1024;
var height = 720/1.5;

var app = new PIXI.Application(); //Initialize the app.
var renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor: 0x000000, antialias: true });
var graphics = new PIXI.Graphics(); //Initialize the graphics.
var stage = new PIXI.Container();

/* Drawing the screen */
document.body.appendChild(renderer.view);

/* Adding events for handling */
document.addEventListener('keydown', onKeyDown); //On key down call function
document.addEventListener('keyup', onKeyUp)

/* Properties of the ball's position */
var ballX = width/2; //Starting off the ball's position is going to be the center of the screen.
var ballY = height/2; //Width with my weird width scale thing.

/* Properties of the ball's direction */
var ballAngle = (Math.random() * 360) + 1; //Angle of the ball random each time.
var ballSpeed = 8; //Is one for now.

/* Properties of the ball's paddle */
var paddleX = width/15;
var paddleY = height/2 - 100/2;
var paddleSpeed = 10;

/* Adding Graphics */
stage.addChild(graphics); //Add graphics to stage.

var keys = [false, false]; //Keys of W and Up being 0, and S and Down being 1.

/* Animating */
animate();

/**
 * @desc Handling the key presses.
 * @param {object} key the key that is being pressed.
 */
function onKeyDown(key) {
    //Up
    if (key.keyCode === 87 || key.keyCode === 38) {
        keys[0] = true;
    }

    //Down
    if (key.keyCode === 83 || key.keyCode === 40) {
        keys[1] = true;
    }
}

/**
 * @desc Handling the key presses.
 * @param {object} key the key that is being pressed.
 */
function onKeyUp(key) {
    //Up
    if (key.keyCode === 87 || key.keyCode === 38) {
        keys[0] = false;
    }

    //Down
    if (key.keyCode === 83 || key.keyCode === 40) {
        keys[1] = false;
    }    
}

/**
 * @desc Handling the logic of if keys are down.
 */
function handleKeys() {
    if (keys[0]) { //While up is pressed.
        paddleY -= paddleSpeed;
    }

    if (keys[1]) { //While down is pressed.
        paddleY += paddleSpeed;
    }
}

/**
 * @desc Handling the physics for the gamestuffs.
 */
function doPhysics() {
    if (ballY <= 0 || ballY >= height) {
        ballAngle = 360 - ballAngle; //Reflect the ball.
    }

    if (ballX <= 0 || ballX >= width) {
        ballAngle = 360 - ballAngle;
        ballSpeed = -ballSpeed;
    }

    /* Change ball position using vector math / unit circle */
    ballX += (ballSpeed * Math.cos(Math.PI/2 * ballAngle));
    ballY += (ballSpeed * Math.sin(Math.PI/2 * ballAngle));
}

/**
 * @desc Draw the ball for the game.
 */ 
function drawBall() {
    /* Drawing the ball */
    graphics.beginFill(0xe74c3c); //Begin drawing with color.
    graphics.drawCircle(ballX, ballY, 10); //Begin drawing the circle.
    graphics.endFill();
    /* Done drawing the ball */
}

/**
 *  @desc Draw the paddles for the game.
 */
function drawPaddles() {
    /* Drawing the paddle */
    graphics.beginFill(0xffffff); //Begin drawing with white.
    graphics.drawRect(paddleX, paddleY, 10, 100);
    graphics.endFill();
    /* Done drawing the paddle */
}

/**
 * @desc Animate everything and this is the basis for our gameloop.
 */
function animate() {
    graphics.clear(); //Clear scene

    handleKeys();
    doPhysics();

    drawBall();
    drawPaddles();

    renderer.render(stage);
    requestAnimationFrame(animate);
}