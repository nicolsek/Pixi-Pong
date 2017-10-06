var width = 1280;
var height = 720/1.5;

var app = new PIXI.Application(); //Initialize the app.
var renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor: 0x000000, antialias: true });
var graphics = new PIXI.Graphics(); //Initialize the graphics.
var stage = new PIXI.Container();

/* Drawing the screen */
document.body.appendChild(renderer.view);

/* Properties of the ball's position */
var ballX = width/2; //Starting off the ball's position is going to be the center of the screen.
var ballY = height/2; //Width with my weird width scale thing.

/* Properties of the ball's direction */
var ballAngle = (Math.random() * 360) + 1; //Angle of the ball random each time.
var ballSpeed = 4; //Is one for now.

/* Adding Graphics */
stage.addChild(graphics); //Add graphics to stage.

/* Animating */
animate();

function doPhysics() {
    if (ballX <= 0 || ballX >= width || ballY <= 0 || ballY >= height) {
        ballAngle = 360 - ballAngle; //Reflect the ball.
    }

    /* Change ball position using vector math / unit circle */
    ballX += (ballSpeed * Math.cos(Math.PI/2 * ballAngle));
    ballY += (ballSpeed * Math.sin(Math.PI/2 * ballAngle));
}

function drawBall() {
    /* Drawing the ball */
    graphics.beginFill(0xe74c3c); //Begin drawing with color.
    graphics.drawCircle(ballX, ballY, 10); //Begin drawing the circle.
    graphics.endFill();
    /* Done drawing the ball */
}


function animate() {
    graphics.clear(); //Clear scene

    doPhysics();
    drawBall();

    renderer.render(stage);
    requestAnimationFrame(animate);
}
/* Done animating */
