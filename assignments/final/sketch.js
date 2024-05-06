let mouseXPos, mouseYPos; 
let Dots_num = 5; 

let dots = []; 
let rains = [];
let ship;
//create slide
let slide;

//upload image
let background_image;
let drop_image;
let ship_image;
//Sound
let scale = 'major';
let note = 0;
let sixteenth = 0;
let root = 80;


//camera
let video;
let handpose;
let hands = [];
let handClosed = false;

//Create button
let swtich; 
let showKeypoints = true;

function preload() {
  sound = loadSound("piano.wav"); 
  background_image = loadImage('bg01.jpg');
  drop_image= loadImage('drop.png');
  ship_image= loadImage('ship.png');
}

function setup() {
  createCanvas(600, 400); 
  userStartAudio();
  ship = new Ship(width / 2 - 50, height - 100, 100, 100);
  synth = new p5.PolySynth();
  for (let i = 0; i < Dots_num; i++) {
    dots.push(new Dots());
  }
  
  for (let i = 0; i < 50; i++) {
    rains.push(new Rain());
  }
 //Slider
  slide = createSlider(5, 15, Dots_num);
  slide.position(20, 20);
  slide.style('width', '100px');
//Button
swtich = createButton('Show Keypoints');
swtich.position(20, 40);
swtich.mousePressed(SwitchKeyPoints);

  //Cams
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', gotHands);
}

function modelLoaded() {
  console.log('model loaded');
}
function gotHands(results) {
  hands = results;
}


function draw() {
  background(background_image);
  //ship control
  textSize(12);
  textAlign(CENTER, CENTER);
  let textContent = "Make a fist or move your mouse";
  text(textContent, width/2, 30);
  ship.draw();
  ship.update();
  // draw dot on mouse
  mouseXPos = mouseX;
  mouseYPos = mouseY;
  fill(0); 
  noStroke();
  fill(0);
  ellipse(mouseXPos, mouseYPos, 7,7); 
 // Update dots num
  let nweDots_num = slide.value();
  if (nweDots_num !== Dots_num) {
    updateDots(nweDots_num);
    Dots_num = nweDots_num;
  }
  //draw Dots
  for (let i = 0; i < Dots_num; i++) {
    dots[i].update();
    dots[i].display();
    dots[i].connectToMouse();
	dots[i].moveTowardsMouse();
	for (let j = i + 1; j < Dots_num; j++) {
		dots[i].connectToPoint(dots[j]);
	  }
  }

  image(video, 500, 0, 100, 80);
  //drawKeypoints();
  if (showKeypoints) {
    drawKeypoints(hands);
  }
//detect hands closed
  HandClosed(hands);
  if (handClosed) {  
    for (let i = 0; i < rains.length; i++) {
      rains[i].pause();
    }
  } else {
    for (let i = 0; i < rains.length; i++) {
      rains[i].resume();
    }
  }
  
  
  for (let i = 0; i < rains.length; i++) {
    rains[i].fall();
    rains[i].display();
  }
}
//detect hands closed
function HandClosed(hands) {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (hand.handInViewConfidence > 0.5) {    
      let landmarks = hand.landmarks;
      let tip = landmarks[8];
      let base = landmarks[0];
      let distance = dist(tip[0], tip[1], base[0], base[1]); 
      if (distance < 150) {        
        handClosed = true;
        return;
      }
    }
  }
  handClosed = false;
}


// show keypoints
function drawKeypoints() {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = hand.landmarks;
    for (let j = 0; j < keypoints.length; j++) {
      let [x, y] = keypoints[j];
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}

function SwitchKeyPoints() {
  showKeypoints = !showKeypoints;
}

function updateDots(nweDots_num) {
	while (dots.length < nweDots_num) {
	  dots.push(new Dots());
	}
	while (dots.length > nweDots_num) {
	  dots.pop();
	}
  }
