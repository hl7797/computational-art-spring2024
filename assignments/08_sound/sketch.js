let song;


function setup() 
  {
  song = loadSound("https://hl7797.github.io/computational-art-spring2024/assignments/08_sound/samples/piano.wav");
 // song = loadSound('samples/piano.wav');
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
