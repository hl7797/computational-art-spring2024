class Vehicle {
    constructor(x, y, target) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);

        this.target = target;
        this.maxSpeed = 5;
        this.maxForce = 0.05;

        this.dim = 2 + random(5);

        this.hue = random(100, 200);
        this.saturation = 70;
        this.brightness = 80;

        this.range = 100;

        this.mass = 1;

        background(0, 0, 100);
        
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    seek(t, arrive) {
        let desired = p5.Vector.sub(t, this.pos);

        let distance = desired.mag();

        if (arrive && distance < 100) {
            let speed = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(speed);
        } else {
            desired.setMag(this.maxSpeed);
        }

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);

        this.addForce(steer);
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    update() {
        let closeFood = this.getCloseFood();
        if (closeFood) {
            this.seek(closeFood.pos); 
            let d = p5.Vector.dist(this.pos, closeFood.pos);
            if (d < this.dim / 2 + closeFood.size / 2) {
                foods.splice(foods.indexOf(closeFood), 1);
                vehicles.push(new Vehicle(random(width), random(height), this.target));
            }
        } 
        
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    getCloseFood() {
        let closeFood = null;
        let closeDist = 500;
        for (let food of foods) {
            let dist = p5.Vector.dist(this.pos, food.pos);
            if (dist < closeDist) {
                closeDist = dist;
                closeFood = food;
            }
        }
        return closeFood;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        let angle = this.vel.heading();
        rotate(angle);
        fill(this.hue, this.saturation, this.brightness);
        beginShape();
        vertex(this.dim * 2, 0);
        vertex(-this.dim * 2, this.dim);
        vertex(-this.dim * 2, -this.dim);
        endShape(CLOSE);
        pop();
    }
}