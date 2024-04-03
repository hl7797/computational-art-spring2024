let angle = 0;
let direction = 1;

function setup() {
  createCanvas(600, 600);
  noFill();
}
function draw() {
  background(255,20);
  Text();
  translate(width/2, height/2);
  drawSquare(0, 0, 250);
  angle += 0.008 * direction;
}
function drawSquare(x, y, size) {
  if (size < 5) {
    return;
  }
   strokeWeight(1);
   stroke(255,100,50);
   rotate(angle);
   rect(x, y, size, size);
   drawSquare(x, y, size/2);
}
function mouseClicked() {
  direction *= -1;
}
function Text(){
    textSize(18);
    text("Click to change rotation direction", 150, 500);
}