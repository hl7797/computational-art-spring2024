let n = 0; 
let x;
  
function setup() { 
    createCanvas(600,600); 
} 

function draw() { 
    background(0); 
    let noiseVal = []; 
    for (let i = 0; i < width; i++) { 
        noiseVal[i] = noise(n) * height; 
        n += 0.02; 
    } 
  x= color(random(255), random(255), random(255));
    
    stroke(x); 
    noFill(); 
    beginShape(); 
    for (let x = 0; x < width; x++) { 
        vertex(x, noiseVal[x]); 
    } 
    endShape(); 
} 




