let kickSample;

function preload() {
  kickSample = loadSound("https://hl7797.github.io/computational-art-spring2024/assignments/08_sound/samples/111.wav");
}

function setup() {

 createCanvas(600, 400);

}

function draw() {
  
  background(0, 100, 100);

}


function mousePressed() {
  userStartAudio();
}