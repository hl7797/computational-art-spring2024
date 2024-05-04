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
let predictions = [];
let handClosed = false;
let toggleButton; 
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

  //Slide更新dots的数量
  slide = createSlider(5, 15, Dots_num);
  slide.position(20, 20);
  slide.style('width', '100px');
  // 初始化黑点
  for (let i = 0; i < Dots_num; i++) {
    dots.push(new Dots());
  }
  //初始化雨滴
  for (let i = 0; i < 50; i++) {
    rains.push(new Rain());
  }

  video = createCapture(VIDEO);
  //video.size(0,0);
  video.hide();
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', gotPredictions);

  toggleButton = createButton('Toggle Keypoints');
  toggleButton.position(20, 20);
  toggleButton.mousePressed(drawKeypoints);
}

function modelLoaded() {
  console.log('Handpose model loaded');
}
function gotPredictions(results) {
  predictions = results;
}


function draw() {
  background(background_image);
  if (showKeypoints) {
    drawKeypoints(predictions);
  }
  mouseXPos = mouseX;
  mouseYPos = mouseY;

  fill(0); // 将填充颜色设置为黑色
  noStroke(); // 不绘制点的边框
  ellipse(mouseXPos, mouseYPos, 7,7); // 在鼠标位置绘制一个半径为5的圆（即点）
 
  // for (let rain of rains) {
  //   rain.fall();
  //   rain.display();
  // }

  
 

  // 如果新的点的数量不同于旧的点的数量，更新点数组
  let nweDots_num = slide.value();
  if (nweDots_num !== Dots_num) {
    updateDots(nweDots_num);
    Dots_num = nweDots_num;
  }
  // 更新和绘制每个黑点
  for (let i = 0; i < Dots_num; i++) {
    dots[i].update();
    dots[i].display();
    dots[i].connectToMouse();
	dots[i].moveTowardsMouse();
	for (let j = i + 1; j < Dots_num; j++) {
		dots[i].connectToPoint(dots[j]);
		
	  }
  }

  image(video, 0, 0, 20, 20);
  //drawKeypoints();

  detectHandClosed(predictions);
  if (handClosed) {
    // 手部握拳时，限制雨滴在手部区域内
    for (let i = 0; i < rains.length; i++) {
      rains[i].pause();
    }
  } else {
    // 手部放开时，恢复雨滴的自由下落
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

function detectHandClosed(predictions) {
  for (let i = 0; i < predictions.length; i++) {
    let prediction = predictions[i];
    if (prediction.handInViewConfidence > 0.5) {
      // 如果手部置信度高于阈值，检测手部是否握拳
      let landmarks = prediction.landmarks;
      let tip = landmarks[8]; // 手指尖部分的关键点
      let base = landmarks[0]; // 手部基础部分的关键点
      let distance = dist(tip[0], tip[1], base[0], base[1]); // 计算手指尖到手部基础部分的距离
      if (distance < 150) {
        // 如果手指尖到手部基础部分的距离小于阈值，认为手部握拳
        handClosed = true;
        return;
      }
    }
  }
  // 如果没有检测到握拳手势，手部放开
  handClosed = false;
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    let prediction = predictions[i];
    let keypoints = prediction.landmarks;
    for (let j = 0; j < keypoints.length; j++) {
      let [x, y] = keypoints[j];
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}
function updateDots(nweDots_num) {
	// 如果新的点的数量大于旧的点的数量，添加新的点
	while (dots.length < nweDots_num) {
	  dots.push(new Dots());
	}
	// 如果新的点的数量小于旧的点的数量，删除多余的点
	while (dots.length > nweDots_num) {
	  dots.pop();
	}
  }
