//Global Variables
let player;
let x, y;
let playerSpeed;
let dialog;
let npc;
let grammar = "";

//Setup Function
function setup()
{
	createCanvas(500, 500);
	
	//Player Initialization
	x = 50;
	y = 50;
	playerSpeed = 2;
	
	//Dialog Box Initialization
	grammar = "Hello there? Would you like to hear a story? Press 'Y' or 'N'.";
}

//Draw Loop Function
function draw()
{
	strokeWeight(2);
	background(100, 210, 100);
	
	fill(80, 160, 200);
	stroke(40, 80, 100);
	player = ellipse(x, y, 20, 20);
	
	fill(200, 80, 80);
	stroke(100, 40, 40);
	npc = ellipse(250, 200, 20, 20);
	
	if (x > 200 && x < 300 && y < 250 && y > 150)
	{
		fill(255);
		stroke(100);
		dialog = rect(10, 400, 480, 90);
		
		fill(10);
		strokeWeight(0);
		text(grammar, 15, 405, 475, 85);
	}
	
	if (keyIsDown(87)) y -= playerSpeed; //'W' keycode = 87
	if (keyIsDown(83)) y += playerSpeed; //'S' keycode = 83
	if (keyIsDown(68)) x += playerSpeed; //'D' keycode = 68
	if (keyIsDown(65)) x -= playerSpeed; //'A' keycode = 65
}

function keyPressed()
{
	if (x > 200 && x < 300 && y < 250 && y > 150)
	{
		if (keyCode === 89) makeGrammar();
		else if (keyCode === 78) grammar = "Alright then, see you later! Press 'Y' if you change your mind!";
	}
}

function makeGrammar()
{
	//Word Banks
	let monsters = ["giant toad", "dragon", "dire wolf", "witch", "orc", "bear", "giant", "griffin", "golem", "troll"];
	let items = ["chalice", "treasure", "sword", "crown", "map", "key", "orb", "lantern", "grenade", "spear"];
	let placeNames = ["Oldtown", "Alasia", "Marrowfel", "Edenbough", "Camelot", "Newtown", "Liarsburg", "Taldor"];
	let places = ["river", "forest", "hunting grounds", "tower", "hill", "mountain", "cave", "lair", "dungeon"];
	let verbs = ["slayed", "spun", "ate", "found", "lost", "drank", "became", "forgot", "sold", "bought", "destroyed", "saved"];
	let peopleNames = ["Fred", "Kevdak", "Malto", "Eindol", "Eggard", "Mavus", "Bailey", "Laura", "Lyra", "Tomag", "Skootski", "Mambo"];
	let adjectives = ["slimey", "forgotten", "lost", "magical", "holy", "cursed",  "baked", "awesome", "deadly", "broken", "malevolent"];
	
	//Beginnings
	beginnings = [];
	beginnings.push("Once upon a time, ");
	beginnings.push("A long time ago, in a Galaxy far far away... ");
	beginnings.push("This is the story of the time that ");
	beginnings.push("Many years ago, ");
	beginnings.push("One day long ago, ");
	
	//Sentence Bank
	sentences = [];
	sentences.push("HERO the GOODTITLE went to the PLACE of TOWN in search of the ITEM of ORIGIN. ");
	sentences.push("VILLAIN was a great big MONSTER of pure ADJECTIVE2 evil. ");
	sentences.push("HERO brandished their ADJECTIVE1 TOOL, and used it to defeat the evil VILLAIN. ");
	sentences.push("VILLAIN the EVILTITLE was terrorizing the people of TOWN with their army of MINIONSs. ");
	sentences.push("HERO defeated the MINIONSs of VILLAIN with a genius plan! ");
	sentences.push("HERO VERB1 the ITEM in an effort to confuse VILLAIN. ");
	
	endings = [];
	endings.push("Because of HERO, everyone lived happily ever after.");
	endings.push("If you listen closely, you can still hear the ghost of VILLAIN, waiting to return!");
	endings.push("Thus TOWN was saved from utter destruction by HERO and their heroic deeds.");
	endings.push("Ever since then, people far and wide have told the story of HERO and his ADJECTIVE1 battle with VILLAIN.");
	endings.push("No one knows what happened to HERO, but legends say they still roam the lands, in search of evil to defeat.");
	
	//Story Generation
	grammar = "";
	grammar += beginnings[Math.floor(Math.random()*beginnings.length)];
	for (i = 0; i < 4; i++)
	{
		let index = Math.floor(Math.random()*sentences.length);
		grammar += sentences.splice(index, 1)[0];
	}
	grammar += endings[Math.floor(Math.random()*endings.length)];
	grammar += " Do you want to hear another story?"
	
	//Replace HERO
	let index = Math.floor(Math.random()*peopleNames.length);
	grammar = grammar.replace(/HERO/g, peopleNames.splice(index, 1)[0]);
	
	//Replace VILLAIN
	index = Math.floor(Math.random()*peopleNames.length);
	grammar = grammar.replace(/VILLAIN/g, peopleNames.splice(index, 1)[0]);
	
	//Replace GOODTITLE
	index = Math.floor(Math.random()*adjectives.length);
	grammar = grammar.replace(/GOODTITLE/g, adjectives.splice(index, 1)[0]);
	
	//Replace EVILTITLE
	index = Math.floor(Math.random()*adjectives.length);
	grammar = grammar.replace(/EVILTITLE/g, adjectives.splice(index, 1)[0]);
	
	//Replace ADJECTIVE2
	index = Math.floor(Math.random()*adjectives.length);
	grammar = grammar.replace(/ADJECTIVE2/g, adjectives.splice(index, 1)[0]);
	
	//Replace ADJECTIVE1
	index = Math.floor(Math.random()*adjectives.length);
	grammar = grammar.replace(/ADJECTIVE1/g, adjectives.splice(index, 1)[0]);
	
	//Replace TOOL
	index = Math.floor(Math.random()*items.length);
	grammar = grammar.replace(/TOOL/g, items.splice(index, 1)[0]);
	
	//Replace ITEM
	index = Math.floor(Math.random()*items.length);
	grammar = grammar.replace(/ITEM/g, items.splice(index, 1)[0]);
	
	//Replace MINIONS
	index = Math.floor(Math.random()*monsters.length);
	grammar = grammar.replace(/MINIONS/g, monsters.splice(index, 1)[0]);
	
	//Replace MONSTER
	index = Math.floor(Math.random()*monsters.length);
	grammar = grammar.replace(/MONSTER/g, monsters.splice(index, 1)[0]);
	
	//Replace VERB1
	index = Math.floor(Math.random()*verbs.length);
	grammar = grammar.replace(/VERB1/g, verbs.splice(index, 1)[0]);
	
	//Replace PLACE
	index = Math.floor(Math.random()*places.length);
	grammar = grammar.replace(/PLACE/g, places.splice(index, 1)[0]);
	
	//Replace IPLACE
	index = Math.floor(Math.random()*placeNames.length);
	grammar = grammar.replace(/ORIGIN/g, placeNames.splice(index, 1)[0]);
	
	//Replace TOWN
	index = Math.floor(Math.random()*placeNames.length);
	grammar = grammar.replace(/TOWN/g, placeNames.splice(index, 1)[0]);
}