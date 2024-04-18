class Ball {
    constructor(x, y, radius, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  
   
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
   
      if (this.x < 0 || this.x  > width) {
        this.speedX *= -1;
      }
      if (this.y < 0 || this.y  > height) {
        this.speedY *= -1;
      }
    }
  
    show() {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.radius * 2);
    }
  

    collidesWith(other) {
      let distance = dist(this.x, this.y, other.x, other.y);
      return distance < this.radius + other.radius;
    }
   
  }