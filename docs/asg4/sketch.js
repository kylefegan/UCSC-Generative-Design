let world;
let race;
let camera;
let genetics;

function setup() {
  createCanvas(640, 400, WEBGL);
  setAttributes('antialias', true);

  // Initialize box2d physics and create the world
  world = createWorld();
  camera = createCamera();

  // Create Camera
  camera.ortho(-width / 2, width / 2, -height / 2, height /2, 0, 10);
  camera.setPosition(0, 0, 0);
  
  
  genetics = new GeneticAlgorithm(10, 10, fitnessFunction, 0.05);
  let carsList = [];
  for(let i = 0; i < genetics.population.length; i++)
  {
      carsList.push(genetics.population[i]);
  }
  
  // Create a terrain
  let pos = createVector(-width/2, 10);
  terrain = new Terrain(pos.x, pos.y, 100, 100, 1);

  // Create a world to manage the cars
  race = new Race(terrain, carsList, raceOverCallback);
  
  race.start();
  
}

function draw() {
    if (race.running) {
        background(240);
    }

    race.update();
    race.draw();

    if(race.running) {
        // Update physics. 2nd and 3rd arguments are velocity and position iterations
        let timeStep = 1.0 / 30;
        world.Step(timeStep, 10, 10);

        // Get race leaderboards
        let leaderboard = race.getLeaderboards();

        // Follow first car with the camera
        let firstCar = leaderboard[0].car;

        if (firstCar) {
            let firstPos = firstCar.getPosition();
            camera.setPosition(firstPos.x + width/5, firstPos.y, camera.eyeZ);
        }
    }
}

// ========================================
// Callback function for when the race is over
// ========================================
function raceOverCallback(finalLeaderboards) {
    console.log("race over!");
    console.log(finalLeaderboards);

    // Restart race with new cars
	
	genetics.evolve();
	//console.log(genetics.population);
    let carsList = [];
	for(let i = 0; i < genetics.population.length; ++i)
	{
		carsList.push(genetics.population[i]);
	}
	//console.log(carsList);
    race.setCars(carsList);
    race.start();
}

function fitnessFunction()
{
	return race.getLeaderboards();
}
