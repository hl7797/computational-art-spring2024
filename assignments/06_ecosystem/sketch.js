
let vehicles = [];
let numVehicles = 30;
let target;
let foods = []; // 存储食物

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

  target.x = mouseX; 
  target.y = mouseY;

  ellipse(target.x, target.y, 10, 10);

  // 绘制食物
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
  // 在点击鼠标时生成食物
  foods.push(new Food(mouseX, mouseY));
}

class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 5;
    this.color = color(255, 0, 0);
  }
  
  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}