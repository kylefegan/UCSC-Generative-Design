class Particle
{
	constructor(position)
	{
		//Particle Class Variables
		this.amp = (amplitude.getLevel()*100)/2;
		this.acceleration = createVector(0, 0);
		this.velocity = createVector(random(-this.amp, this.amp), random(-this.amp, this.amp));
		this.position = position.copy();
		this.lifespan = 400;
		this.pColor = color(30, 30, 60)
		
		//Color & Initial Position based on Amplitude
		if ((amplitude.getLevel()*100) > 1)
		{
			this.pColor = color(30, 30, (amplitude.getLevel()*10000)/2);
		}
		if ((amplitude.getLevel()*100) > 3)
		{
			this.pColor = color((amplitude.getLevel()*10000)/2, 30, (amplitude.getLevel()*10000)/2);
			this.position.add(createVector(random(-30, 30), random(-50, 50)));
		}
		if ((amplitude.getLevel()*100) > 5)
		{
			this.pColor = color((amplitude.getLevel()*10000)/2, 30, (amplitude.getLevel()*10000)/4);
			this.position.add(createVector(random(-50, 50), random(-50, 50)));
		}
	}
	
	run() //Executes every draw loop
	{
		this.updatePosition();
		this.display();
	}
	
	updatePosition() //Updates position and velocity when called
	{
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.lifespan -= 2;
	}
	
	display() //Drawing information
	{
		stroke(this.pColor);
		fill(this.pColor);
		ellipse(this.position.x, this.position.y, this.amp*4, this.amp*4);
	}
	
	isDead() //Returns true if particle is expired
	{
		if (this.lifespan < 0) return true;
		else return false;
	}
}