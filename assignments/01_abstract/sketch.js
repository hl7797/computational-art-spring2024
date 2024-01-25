let dot;


function setup() {
  createCanvas(800,600);
  colorMode(HSB);

  dot = new Dot(100,350,50);

}

function draw() {
  //background(0,0,100);

  dot.update();

}

class Dot {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.hue = random(360);
  }

  update() {
    fill(this.hue, 50, 100);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

}