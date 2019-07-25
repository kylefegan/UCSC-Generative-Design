//Global Variables
var player;
let x, y;
let playerSpeed;

//Setup Function
function setup()
{
	createCanvas(500, 500);
	
	//Player Initialization
	x = 50;
	y = 50;
	playerSpeed = 2;
	fill(250, 200, 100);
	stroke(200, 160, 80);
	strokeWeight(2);
}

//Draw Loop Function
function draw()
{
	background(240);
	player = ellipse(x, y, 20, 20);
	
	if (keyIsDown(87)) y -= playerSpeed; //'W' keycode = 87
	if (keyIsDown(83)) y += playerSpeed; //'S' keycode = 83
	if (keyIsDown(68)) x += playerSpeed; //'D' keycode = 68
	if (keyIsDown(65)) x -= playerSpeed; //'A' keycode = 65
}