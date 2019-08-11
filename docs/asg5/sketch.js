//Global Variables
var generatedSong;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
}

function draw() {
    midiPlayer.draw();
}

function onMIDIsLoaded(pianoRolls)
{
	generatedSong = markov(pianoRolls);
	console.log(generatedSong);
	
	//let pianoRoll = midiPlayer.text2Midi();
	//console.log(pianoRoll);
	
	let midi = midiPlayer.text2Midi(generatedSong);

	let midiData = midiPlayer.parseMidi(midi);
	let pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration, midiData.notes);

	midiPlayer.setPianoRoll(pianoRoll, tsCallback);
}


function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}

function markov(pianoRolls)
{
	let superText = "";
	for (var i = 0; i < 70; ++i)
	{
		let pianoRoll = pianoRolls[i];
		let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
		superText += midiText;
	}
	
	let bank = superText.split(" ");
	var index = Math.floor(Math.random() * bank.length);
	
	let newSong = "";
	newSong += bank[index];
	newSong += " ";
	for (var i = 0; i < 500; ++i)
	{
		let prev = bank[index];
		//bank.splice(index);
		index = bank.indexOf(prev, (index + 1));
		if (index == -1)
		{
			newSong += ". "
			index = Math.floor(Math.random() * bank.length);
		}
		else
		{
			index++;
			newSong += bank[index];
			newSong += " ";
		}
	}
	//generatedSong = newSong;
	//console.log(newSong);
	return newSong;
}