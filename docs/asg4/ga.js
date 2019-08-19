class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    init()
	{
        for(let i = 0; i < this.indSize; i++) {
            this.gens[i] = int(random(2));
        }
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;
		this.mutationR = mutationRate;
		this.nameVar = 0;
		this.population;
        this.init();
    }

    init()
	{
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
			let feats = Car.randomFeatures();
			let pos = createVector(0, -100);
            this.population[i] = new Car(pos.x, pos.y, "car" + i, feats);
        }
    }

    evolve() {
        //this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);
		
        this.population = newPopulation;

        //this.evaluate();
        return this.best();
    }

    evaluate() {
        for(let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunc(individual.gens)
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }

        return matingPool;
    }

    rouletteWheel()
	{
		let leaders = this.fitFunc();
		let roulette = Math.random();
		let selectedCar;
		let totalProgress = 0;
		let chance = 0;
		
		for (let i = 0; i < leaders.length; ++i) totalProgress += leaders[i].progress;
		
		for (let i = 0; i < leaders.length; ++i)
		{
			chance += leaders[i].progress/totalProgress;
			if (roulette < chance) selectedCar = leaders[i].car;
			if (i == leaders.length - 1) selectedCar = leaders[i].car;
		}
		
		return selectedCar;
    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);

        for(let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));

            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
        }

        return newPopulation;
    }

    crossover(parentA, parentB)
	{
		let feats = Car.randomFeatures();
		let pos = createVector(0, -100);
		let child = new Car(pos.x, pos.y, "car " + this.nameVar, Car.randomFeatures());
		++this.nameVar;
		let geneSelection = Math.random();
		
		for (let i = 0; i < child.feats.length; ++i)
		{
			if (geneSelection > 0.5) child.feats[i] = parentB.feats[i];
			
			geneSelection = Math.random();
		}
		
		return child;
    }

    mutate(newPopulation)
	{
		let randomGenome = Car.randomFeatures();
		
		for (let i = 0; i < newPopulation.length; ++i)
		{
			let c = newPopulation[i];
			let r = Math.random();
			
			for (let j = 0; j < c.feats.length; ++j)
			{
				if (r < this.mutationR) c.feats[j] = randomGenome[j];
			}
		}
    }

    best()
	{
		let leaders = this.fitFunc();
		return leaders[0].car;
    }
}
