let mouseXPos, mouseYPos; // 鼠标点的位置
let Dots_num = 5; // 黑点的数量

let dots = []; 
let rains = [];

//create slide
let slide;

//upload image
let background_image;
let drop_image;
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
let swtich; 
let showKeypoints = true;

function preload() {
  sound = loadSound("piano.wav"); 
  background_image = loadImage('bg01.jpg');
  drop_image= loadImage('drop.png');
}

function setup() {
  createCanvas(600, 400); 
  userStartAudio();
  synth = new p5.PolySynth();

 
  slide = createSlider(5, 15, Dots_num);
  slide.position(20, 20);
  slide.style('width', '100px');
  
  for (let i = 0; i < Dots_num; i++) {
    dots.push(new Dots());
  }
  
  for (let i = 0; i < 50; i++) {
    rains.push(new Rain());
  }

  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', gotHands);

  swtich = createButton('Show Keypoints');
  swtich.position(20, 40);
  swtich.mousePressed(SwitchKeyPoints);
}

function modelLoaded() {
  console.log('model loaded');
}
function gotHands(results) {
  hands = results;
}


function draw() {
  background(background_image);
  mouseXPos = mouseX;
  mouseYPos = mouseY;
  fill(0); 
  noStroke();
  ellipse(mouseXPos, mouseYPos, 7,7); 
 
  let nweDots_num = slide.value();
  if (nweDots_num !== Dots_num) {
    updateDots(nweDots_num);
    Dots_num = nweDots_num;
  }
  
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
  
  // 绘制雨滴
  for (let i = 0; i < rains.length; i++) {
    rains[i].fall();
    rains[i].display();
  }
}

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
  // 如果没有检测到握拳手势，手部放开
  handClosed = false;
}

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
