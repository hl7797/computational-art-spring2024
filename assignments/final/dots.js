
class Dots {
    constructor() {
      this.x = random(width);
      this.y = random(height);
      this.speedX = random(-0.5, 0.5);
      this.speedY = random(-0.5, 0.5);
      this.soundPlayed = false;
    
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (this.x < 0 || this.x > width) {
        this.speedX *= -1;
      }
      if (this.y < 0 || this.y > height) {
        this.speedY *= -1;
      }
    }
  
    display() {
      fill(0);
      noStroke();
      ellipse(this.x, this.y, 7, 7);
    }
    connectToMouse() {
        let distance = dist(this.x, this.y, mouseXPos, mouseYPos);
        if (distance < 100) {
            let interColor = lerpColor(color(0), color(255), map(distance, 0, 120, 0, 1));
            stroke(interColor);
          line(this.x, this.y, mouseXPos, mouseYPos);
         this.playSoundOnce() ;
        }else{
            this.soundPlayed = false ;
        }
      }
      connectToPoint(otherPoint) {
        let distance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (distance < 100) {
            let interColor = lerpColor(color(0), color(255), map(distance, 0, 120, 0, 1));
            stroke(interColor);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
        
        
      }
      moveTowardsMouse() {
        let dx = mouseXPos - this.x;
        let dy = mouseYPos - this.y;
        let distance = dist(this.x, this.y, mouseXPos, mouseYPos);
        if (distance < 100) {
          this.x += dx * 0.008;
          this.y += dy * 0.008;
        }
      }

       playSoundOnce() {
        if (!this.soundPlayed) {
            let noteOffset = sixteenth + floor(random(-5, 5));
            let scaleIndex = noteOffset % scales[scale].length;
            let note = midiToFreq(root + scales[scale][scaleIndex]);
            synth.play(note, 1, 0, 0.5); 
            this.soundPlayed = true;
        }
      }
    }