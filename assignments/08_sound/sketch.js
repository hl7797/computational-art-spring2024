let balls = [];
let song; 
let osc;
let scale = 'major';
let note = 0;
let sixteenth = 0;
let root = 60;
function preload() {
  sound = loadSound("piano.wav"); 
}

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator('sawStooth');
  synth = new p5.PolySynth();

}

function draw() {
  background(220);

  for (let ball of balls) {
    ball.update();
    ball.show();
  }


  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].collidesWith(balls[j])) {
        osc.freq(map(balls[i].x, 0, width, 100, 500));
        osc.amp(0.5);
        osc.start(); 
      }
    }
  }
}

function mouseClicked() {
  balls.push(new Ball(random(width), random(height), random(10, 30), random(-5, 5), random(-5, 5)));
  let noteOffset = sixteenth + floor(random(-2, 2));
   let scaleIndex = noteOffset % scales[scale].length;
   let note = midiToFreq(root + scales[scale][scaleIndex]);
  synth.play(note, 0.5, 0, 0.2); 
  
}

