
class Rain {
    constructor() {
      this.x = random(width); // 随机x位置
      this.y = random(-500, -50); // 在屏幕之上的随机y位置
      this.z = random(0, 20); // 随机z位置
      this.yspeed = map(this.z, 0, 20,0,5); // 雨滴速度随z位置变化
    }
    
    fall() {
      this.y += this.yspeed; // 雨滴下落
      
      // 当雨滴落出屏幕时重新设置位置
      if (this.y > height || (this.y > height / 2 && random(1) < 0.01)) {
        this.x = random(width);
      
        this.y = random(-200, -100);
        this.yspeed = map(this.z, 0, 20, 0, 5); 

      }
    }
    
    display() {
      image(drop_image, this.x, this.y, 15, 15);
      
    }
    constrainToHand() {
      // 限制雨滴在手部区域内
      this.x = mouseX + random(-20, 20);
      this.y = mouseY + random(-20, 20);
    }
  }