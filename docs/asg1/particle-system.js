class ParticleSystem
{
	constructor(position)
	{
		this.origin = position.copy();
		this.particles = []; //Array of particles
	}
	
	addParticle() //Adds a new particle to the system when called
	{
		this.particles.push(new Particle(this.origin));
	}
	
	run() //Executes every draw loop
	{
		for (let i = this.particles.length-1; i >= 0; --i)
		{
			let p = this.particles[i];
			p.run();
			if (p.isDead()) this.particles.splice(i, 1);
		}
	}
}