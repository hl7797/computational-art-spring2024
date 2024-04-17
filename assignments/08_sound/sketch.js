let keys = 8; // Number of keys in the keyboard
let keyW;
let keyH;

let song;
let note = 0;
let scale = "major";
let scaleNotes = [0,2,4,5,7,9,11,12]; // Dorian scale intervals

function preload() {
  song = loadSound("piano.wav");
}

function setup() {
  createCanvas(400, 400);
  keyW = width / keys;
  keyH = height;
}

function draw() {
  background(220);
keyboard();
  
}

function mouseClicked() {
  // Increment note within the scale
  note++;
  if (note >= scaleNotes.length) {
    note = 0; // Reset note to 0 if it exceeds the scale length
  }
  
 song.play(note);
}

function keyboard(){
  for (let i = 0; i < keys; i++) {
    if (i % 4 !== 2 && i % 4 !== 2) { 
      fill(255);
      stroke(0);
      rect(i * keyWidth, 0, keyWidth, keyHeight);
    }
  }
  for (let i = 0; i < keys; i++) {
    if (i % 4 === 2 || i % 4 === 2) {
      fill(0);
      stroke(0);
      rect(i * keyWidth, 0, keyWidth, keyHeight);
    }
  }
}