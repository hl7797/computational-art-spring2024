
let vehicles = [];
let numVehicles = 20;
let target;
let foods = []; 

function setup() {
  createCanvas(600, 600);

  colorMode(HSB);
  noStroke();
  
  target = createVector(width/4, height/2);
  for(let i = 0; i < numVehicles; i++) {
    vehicles.push(new Vehicle(random(width), random(height), target));
  }
}

function draw() {
  background(0,0, 100);
  fill(0,0,0)
  textSize(12);
  textAlign(CENTER,CENTER);
  text("Click mouse put foods\n Num of vehicle will group up", width/2, height/2);
  textAlign(LEFT, TOP); 
  text("Vehicles: " + vehicles.length, 10,10);
  target.x = mouseX; 
  target.y = mouseY;

  ellipse(target.x, target.y, 10, 10);


  for (let food of foods) {
    food.show();
  }

  for (let vehicle of vehicles) {
    vehicle.update();
    vehicle.show();
    vehicle.wrap();
  }
}

function mousePressed() {
  foods.push(new Food(mouseX, mouseY));
}

class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 5;
    this.color = color(0,255,255);
  }
  
  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}