let cols, rows;
let space = 60;
let noiseScale = 0.05; 

function setup() {
  createCanvas(600, 600);
  cols = width / space;
  rows = height / space;
  colorMode(360, 100, 100); 
}

function draw() {
  background(220);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      let d = map(noiseVal, 0, 1, 50,space); 
      let colorVal = sin(frameCount * 0.1 + (x + y) *0.2) * 360;
      fill(colorVal, 100, 100);
      noStroke();
      ellipse(x * space + space / 2, y * space + space / 2, d);
    }
  }
}