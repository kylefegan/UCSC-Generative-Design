//Global Variables
let cam;

function setup()
{
	//Create Canvas
	createCanvas(400, 400, WEBGL);
	
	//Create Camera
	cam = createCamera();
	
	//Load textures
	sand = loadImage('img/sand.png');
	water = loadImage('img/water.gif');
	grass = loadImage('img/grass.jpg');
	
	//Create World Generator
	system = new worldGenerator(Math.random()*500); //Usage: worldGenerator(#seed)
}

function draw()
{
	//Background Color
	background(200);
		
	//Run World Generator
	system.run();
	
	//Camera Keyboard Control
	if (keyIsDown(87)) cam.move(0, 0, -5); //'W' keycode = 87
	if (keyIsDown(83)) cam.move(0, 0, 5); //'S' keycode = 83
	if (keyIsDown(68)) cam.move(5, 0, 0); //'D' keycode = 68
	if (keyIsDown(65)) cam.move(-5, 0, 0); //'A' keycode = 65
}

//Camera Mouse Control
function mouseDragged()
{
	cam.pan(-(event.movementX)/100);
	cam.tilt((event.movementY)/100);
}