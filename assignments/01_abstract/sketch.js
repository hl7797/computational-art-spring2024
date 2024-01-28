let x;
let y;
let r=30;
let k =7.2;
let mv =1;
let kx = -300;
let t = 0;


function setup() {
  createCanvas(600,600);
  background(40,90,100);
  colorMode(HSB);
  stroke(255);
  translate(width/2, height/2);
 
  angleMode(DEGREES);

  

}

function draw() {
  
  translate(width/2, height/2);
  h();
 e();


}


function h(){
  fill(20,50,100);
  x = r * (k+1) * cos(t) +r * cos((k-1)*t);
  y = r * (k+1) * sin(t) -r * sin((k-1)*t);
  circle(x,y,5);
  
  t +=mv;
}

function e(){
  x = 15 * (6.5+1) * cos(t) - 15 * cos((6.5+1)*t);
  y = 15 * (6.5+1) * sin(t) - 15 * sin((6.5+1)*t);
  circle(x,y,5);
  t +=mv;
}

