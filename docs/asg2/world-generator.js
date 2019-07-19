class worldGenerator
{
	constructor(seed)
	{
		noiseSeed(seed);
	}
	
	run()
	{
		//Set Default Texture
		texture(sand);
		strokeWeight(1);
	
		//Translate draw position to origin
		translate(200, -200, -100);
	
		//Loop for creating boxes
		for(var i = 0; i < width; i += 10)
		{	//Iterate draw position
			translate(0, 390, 0);
			translate(-10, 10, 0);
			for(var j = 0; j < height; j += 10)
			{
				//Generate Noise
				let n = noise(i/100, j/100);
				let boxHeight = Math.round(n*10)*10;
				translate(0, 0, boxHeight);
			
				translate(0, -10, 0); //Iterate Draw Positon
			
				//Assign Texture & Draw Box
				if (boxHeight >= 50) texture(grass);
				else if (boxHeight >= 40) texture(sand);
				else
				{	//Change position if below sea level...
					translate(0, 0, -boxHeight);
					boxHeight = 30;
					translate(0, 0, boxHeight);
					texture(water);
				}
				box(10);
			
				//Reset Translation
				translate(0, 0, -boxHeight);
			}
		}
	}
}