//Global Variables
var amplitude;
var started = false;

//Preload Music
function preload()
{
	myMusic = loadSound('music/sunflower.mp3'); // Sunflower by Post Malone
	//myMusic = loadSound('music/oceaneyes.mp3'); // Ocean Eyes by Billie Eilish
}

//Create Canvas and Configure Music
function setup()
{
	createCanvas(400, 400);
	system = new ParticleSystem(createVector(width / 2, height / 2));
	
	myMusic.setVolume(0.1);
	amplitude = new p5.Amplitude();
}

//Draw Loop
function draw()
{
	//Background Color
	if (amplitude.getLevel()*100 > 3)
	{
		background(amplitude.getLevel()*1000, 0, amplitude.getLevel()*1000);
	}
	else background(0);
	
	//Particle System Function Calls
	system.addParticle();
	system.run();
	
	//Optional Console Logging
	//console.log(amplitude.getLevel()*100);
}

//Play Music
function mouseClicked()
{
	if (!started)
	{
		myMusic.play();
		started = true;
	}
}