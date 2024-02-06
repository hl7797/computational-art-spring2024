
let pos;
let waveFrequency = 0.02;
let wave = 50;
let Density = 10;
function setup() {
  createCanvas(600, 600);
 
  pos = height / 2;
}

function draw() {
background(0,201,34);

l2();

l();
points();

}

function l() {
  let noiseL = 550;
  let noiseS = 0.002;

  let whiteColor = color(20,80,100);
  stroke(whiteColor);

  for (let x = 0; x < width; x += 1) {
    let nx1 = noiseS * x;
    let nt1 = noiseS * frameCount;

    let y =  noiseL * noise(nx1, nt1);
    line(x, 0, x, y);
  }
}
function l2() {
  let noiseL = 550;
  let noiseS = 0.002;

  let whiteColor = color(0,104,204);
  stroke(whiteColor);

  for (let x = 0; x < width; x += 1) {
    let nx1 = noiseS * x;
    let nt1 = noiseS * frameCount;

    let y =  height-noiseL * noise(nx1, nt1);
    line(x, height, x, y);
  }
}



function points() {
  noStroke(); // 


  for (let x = 0; x < width; x += Density) {
    let noiseValue = noise(x * waveFrequency, frameCount * 0.02);
    let yOffset = map(noiseValue, 0, 1, -wave, wave);
    let q = noise(x * 0.01, frameCount * 0.01) * 255;
    let w = noise(x * 0.01, frameCount * 0.01 + 10) * 255;
    let e = noise(x * 0.01, frameCount * 0.01 + 20) * 255;
    fill(q,w,e);
    ellipse(x, pos + yOffset, 10, 10);
  }
}