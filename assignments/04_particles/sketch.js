class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.size = random(20, 40);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    dir.setMag(0.05);
    this.velocity.add(dir);
    this.velocity.limit(3);
    this.position.add(this.velocity);


    if (this.position.x <= 0 || this.position.x >= width) {
      this.velocity.x *= -1;
    }
    if (this.position.y <= 0 || this.position.y >= height) {
      this.velocity.y *= -1;
    }
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, this.size);
  }
}
let particles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(100, 150, 255);
  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}