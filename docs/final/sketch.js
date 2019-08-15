//Global Variables
let cam;
let count = 0;

function setup()
{
	//Create Canvas
	createCanvas(720, 720, WEBGL);
	
	//Create Camera
	cam = createCamera();
	
	//Disable Draw Loop
	//noLoop();
}

function draw()
{
	//Background Color
	//background(0);
	//background(100, 0, 100);
	stroke(255);
	strokeWeight(0);
	
	//Call Draw Functions
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	//Box Demonstration
	//drawBoxes(500, 1000);
	
	//Tree Demonstration
	//drawTree2D(200, PI/8, 8);
	//drawTree3D(200, PI/4, 30);
	background(200, 200, 255);
	//drawTreeNoise(200, PI/5, 30, 1);
	
	//Tree Animation
	//drawAnimation(200, Math.sin(frameCount/100)*(PI/2), 8);
	drawTreeAnimation(200, PI/5, 30, 1, Math.sin(frameCount/100)/3)
	
	//Mandelbrot Demonstration
	//mandelbrot();
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	//Camera Keyboard Control
	if (keyIsDown(87)) cam.move(0, 0, -10); //'W' keycode = 87
	if (keyIsDown(83)) cam.move(0, 0, 10); //'S' keycode = 83
	if (keyIsDown(68)) cam.move(10, 0, 0); //'D' keycode = 68
	if (keyIsDown(65)) cam.move(-10, 0, 0); //'A' keycode = 65
}

//Camera Mouse Control
function mouseDragged()
{
	cam.pan(-(event.movementX)/100);
	cam.tilt((event.movementY)/100);
}

function drawBoxes(boxSize, tLength)
{
	let warp = 0;
	
	translate(tLength, 0, warp);
	box(boxSize);
	translate(-2*tLength, 0, warp);
	box(boxSize);
	translate(tLength, 0, warp);
	
	translate(0, tLength, warp);
	box(boxSize);
	translate(0, -2*tLength, warp);
	box(boxSize);
	translate(0, tLength, warp);
	
	translate(tLength, tLength, warp);
	box(boxSize);
	translate(-2*tLength, -2*tLength, warp);
	box(boxSize);
	translate(tLength, tLength, warp);
	
	translate(tLength, -tLength, warp);
	box(boxSize);
	translate(-2*tLength, 2*tLength, warp);
	box(boxSize);
	translate(tLength, -tLength, warp);
	
	if (boxSize > 1) drawBoxes(boxSize/2, tLength/2);
}

function drawTree2D(length, angle, end)
{
	//Stroke Weight
	strokeWeight(3);
	
	//Draw Line
	line(0, 0, 0, 0, -length, 0);
	translate(0, -length, 0);
	
	//Recursive Loop
	if (length > end)
	{
		push();
		rotateZ(angle);
		drawTree2D((length*2)/3, angle, end);
		pop();
		
		push();
		rotateZ(-angle);
		drawTree2D((length*2)/3, angle, end);
		pop();
	}
}

function drawAnimation(length, angle, end)
{
	//Stroke Weight
	strokeWeight(3);
	
	//Draw Line
	line(0, 0, 0, 0, -length, 0);
	translate(0, -length, 0);
	
	//Recursive Loop
	if (length > end)
	{
		push();
		rotateZ(angle);
		drawAnimation((length*2)/3, angle, end);
		pop();
		
		push();
		rotateZ(-angle);
		drawAnimation((length*2)/3, angle, end);
		pop();
	}
}

function drawTree3D(length, angle, end)
{
	//Stroke Weight
	strokeWeight(length/30);
	
	//Draw Line
	line(0, 0, 0, 0, -length, 0);
	translate(0, -length, 0);
	
	//Recursive Loop
	if (length > end)
	{
		push();
		rotateZ(angle);
		drawTree3D((length*2)/3, angle, end);
		pop();
		
		push();
		rotateZ(-angle);
		drawTree3D((length*2)/3, angle, end);
		pop();
		
		push();
		rotateX(angle);
		drawTree3D((length*2)/3, angle, end);
		pop();
		
		push();
		rotateX(-angle);
		drawTree3D((length*2)/3, angle, end);
		pop();
	}
}

function drawTreeNoise(length, angle, end, x)
{
	
	//Noise Variables
	++x;
	let n = noise(x);
	
	//Stroke Variables
	strokeWeight(length/30);
	stroke(139 + 10*x, 69 + 5*x, 19 + 5*x);
	
	//Draw Line
	line(0, 0, 0, 0, -length, 0);
	translate(0, -length, 0);
	
	//Recursive Loop
	if (length > end)
	{
		push();
		rotateZ(angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5), end, x);
		pop();
		++x;
		push();
		rotateZ(-angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5), end, x);
		pop();
		++x;
		push();
		rotateX(angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5), end, x);
		pop();
		++x;
		push();
		rotateX(-angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5), end, x);
		pop();
	}
}

function drawTreeAnimation(length, angle, end, x, anim)
{
	
	//Noise Variables
	++x;
	let n = noise(x);
	
	//Stroke Variables
	strokeWeight(length/30);
	stroke(139 + 10*x, 69 + 5*x, 19 + 5*x);
	
	//Draw Line
	line(0, 0, 0, 0, -length, 0);
	translate(0, -length, 0);
	
	//Recursive Loop
	if (length > end)
	{
		push();
		rotateZ(angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5) + (anim-0.5)/10, end, x, anim);
		pop();
		++x;
		push();
		rotateZ(-angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5) + (anim-0.5)/10, end, x, anim);
		pop();
		++x;
		push();
		rotateX(angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5) + (anim-0.5)/10, end, x, anim);
		pop();
		++x;
		push();
		rotateX(-angle + (n-0.5));
		drawTreeNoise((length*2)/3 * (1 + (n-0.5)/10), angle + (n-0.5) + (anim-0.5)/10, end, x, anim);
		pop();
	}
}

//Madelbrot Algorithm by Daniel Shiffman || The Coding Train
//https://www.youtube.com/watch?v=6z7GQewK-Ks
function mandelbrot()
{
	for (let i = 0; i < 400; ++i)
	{
		for (let j = 0; j < 400; ++j)
		{
			var a = map(i, 0, 400, -2, 2);
			var b = map(j, 0, 400, -2, 2);
			
			var ca = a;
			var cb = b;
			
			var n = 0;
			var z = 0;
			
			while (n < 25)
			{
				var aa = a*a - b*b;
				var bb = 2*a*b;
				
				a = aa + ca;
				b = bb + cb;
				
				++n;
				
				if (abs (a + b) > 16) break;
			}
			
			var color = map(n, 0, 25, 0, 255);
			
			stroke(color);
			if (color > 200) rect(i, j, 1, 1);
		} 
	}
}