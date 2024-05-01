class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = random(-1, 1);
      this.vy = random(-2, -1);
      this.alpha = 255; // 初始透明度
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 5; // 透明度逐渐减小
    }
    
    display() {
      noStroke();
      fill(138, 43, 226, this.alpha); // 紫色水花，根据透明度变化
      ellipse(this.x, this.y, 8, 8); // 绘制水花粒子
    }
    
    finished() {
      return this.alpha < 0; // 如果透明度小于0，粒子完成生命周期
    }
  }