class Ship {
    constructor(x, y, width, height) {
      this.x = x; 
      this.y = y; 
      this.width = width; 
      this.height = height; 
    }
    draw() {  
        image(ship_image, this.x,this.y, this.width, this.height);
      }
    update() {
        let dx = mouseX - this.x; 
        let speed = 0.3; 
        if (dx > 0) {
          this.x += min(dx, speed);
        }
        else if (dx < 0) {     
          this.x += max(dx, -speed);
        }
      }
  }