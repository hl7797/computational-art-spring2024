
class Rain {
    constructor() {
      this.x = random(width);
      this.y = random(-500, -50); 
      this.z = random(0, 20);
      this.yspeed = map(this.z, 0, 20,0,5); 
      this.paused = false; 
    }
    
    fall() {
      if (!this.paused) {
      this.y += this.yspeed; 
      if (this.y > height || (this.y > height / 2 && random(1) < 0.01)) {
        this.x = random(width);
        this.y = random(-200, -100);
        this.yspeed = map(this.z, 0, 20, 0, 5); 
      }
    }
    }
    
    display() {
      image(drop_image, this.x, this.y, 15, 15);
    }
    pause() {
      this.paused = true;
    }
    resume() {
      this.paused = false;
    }
    
  }