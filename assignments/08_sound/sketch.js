let song;

function preload(){
  song = loadSound("piano.wav");
}
function setup() 
  {
  //song = loadSound("https://hl7797.github.io/computational-art-spring2024/assignments/08_sound/samples/piano.wav");

  createCanvas(400,400);
  
}
function draw(){
  background(220);
}

function mouseClicked() {
 song.play();
}
