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
  video.size(320,240);
  video.hide();
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', gotPredictions);
}
function modelLoaded() {
  console.log('Handpose model loaded');
}
function gotPredictions(results) {
  predictions = results;
}


function draw() {
  background(background_image);

  mouseXPos = mouseX;
  mouseYPos = mouseY;

  fill(0); // 将填充颜色设置为黑色
  noStroke(); // 不绘制点的边框
  ellipse(mouseXPos, mouseYPos, 7,7); // 在鼠标位置绘制一个半径为5的圆（即点）
 
  for (let rain of rains) {
    rain.fall();
    rain.display();
  }

  
 

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

  image(video, 0, 0, 320, 240);
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    let prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      let keypoints = prediction.landmarks;
      //let [x, y] = keypoints[j];
      // x= map(x,0,video.width,0,width);
      // y= map(y,0,video.height,0,height);
      fill(255, 0, 0);
      noStroke();
      ellipse(keypoints[0], keypoints[1], 10, 10);
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
