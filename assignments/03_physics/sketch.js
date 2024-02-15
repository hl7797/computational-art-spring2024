let shape;
let gravity;
let resistance;
let speed;
let waterRipple;
let waveFrequency;
let waveA;
let waveSpeed;

function setup() {
  createCanvas(600, 400);
  shape = {
    x: width / 2,
    y: 0,
    radius: 20
  };
  gravity = createVector(0, 0.2);
  resistance = 0.1; 
  speed = createVector(random(-2, 2), random(2, 5)); 
  waterR = 0;
  waveF = 0.02;
  waveA = 40;
  waveSpeed = 0.05;
}

function draw() {
  background(220);
   let waterLevel = height * 0.8 + sin(waterR) * waveA;
  waterR += waveSpeed;
  if (shape.y + shape.radius < waterLevel) {
    speed.add(gravity);
    let resistanceForce = speed.copy().mult(-1).normalize().mult(resistance);
    speed.add(resistanceForce);
    shape.x += speed.x;
    shape.y += speed.y;
  } else {
    let bounce = createVector(0, -0.5);
    speed.add(bounce);
    let resistanceForce = speed.copy().mult(-1).normalize().mult(resistance);
    speed.add(resistanceForce);
    shape.x += speed.x;
    shape.y += speed.y;
    speed.add(createVector(random(-0.5, 0.5), random(-0.5, 0)));
  }
  
  drawWaves(waterLevel);
  fill(255);
  ellipse(shape.x, shape.y, shape.radius * 2);
}

function drawWaves(waterLevel) {
  beginShape();
  fill(0,0,255);
  for (let x = 0; x <= width; x += 10) {
    let y = waterLevel + sin(x * waveF + waterR) * waveA;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}