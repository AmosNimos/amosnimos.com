const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const NUM_BALLS = 9999;
const MAX_VELOCITY = 5;
const ATTRACTION_FORCE = 0.1;
const DAMAGE_RANGE = [1, 10];

class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * MAX_VELOCITY;
        this.vy = (Math.random() - 0.5) * MAX_VELOCITY;
        this.radius = 5;
        this.hp = 50;
        this.color = color;
        this.flash = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99; // Small friction to prevent runaway speeds
        this.vy *= 0.99;
    }

    draw() {
        ctx.fillStyle = this.flash ? "white" : this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        this.flash = false;
    }
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function handleCollisions(balls) {
    let grid = new Map();

    for (let ball of balls) {
        let gx = Math.floor(ball.x / 20);
        let gy = Math.floor(ball.y / 20);
        let key = `${gx},${gy}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(ball);
    }

    for (let [key, cellBalls] of grid) {
        for (let i = 0; i < cellBalls.length; i++) {
            for (let j = i + 1; j < cellBalls.length; j++) {
                let a = cellBalls[i];
                let b = cellBalls[j];
                
                if (distance(a, b) < a.radius * 2) {
                    if (a.color !== b.color) {
                        a.flash = b.flash = true;
                        let damage = Math.floor(Math.random() * (DAMAGE_RANGE[1] - DAMAGE_RANGE[0] + 1) + DAMAGE_RANGE[0]);
                        a.hp -= damage;
                        b.hp -= damage;
                        a.vx = -a.vx * 0.5;
                        a.vy = -a.vy * 0.5;
                        b.vx = -b.vx * 0.5;
                        b.vy = -b.vy * 0.5;
                    }
                }
            }
        }
    }
}

function applyAttraction(balls) {
    for (let ball of balls) {
        let nearest = null;
        let minDist = Infinity;
        for (let other of balls) {
            if (ball.color !== other.color) {
                let d = distance(ball, other);
                if (d < minDist) {
                    minDist = d;
                    nearest = other;
                }
            }
        }
        if (nearest) {
            let dx = nearest.x - ball.x;
            let dy = nearest.y - ball.y;
            let mag = Math.hypot(dx, dy) || 1;
            ball.vx += (dx / mag) * ATTRACTION_FORCE;
            ball.vy += (dy / mag) * ATTRACTION_FORCE;
        }
    }
}

let balls = [];
for (let i = 0; i < NUM_BALLS; i++) {
    let x = Math.random() * canvas.width / 2;
    let y = Math.random() * canvas.height;
    balls.push(new Ball(x, y, "blue"));
    balls.push(new Ball(canvas.width - x, y, "red"));
}

function update() {
    balls = balls.filter(ball => ball.hp > 0);
    balls.forEach(ball => ball.update());
    applyAttraction(balls);
    handleCollisions(balls);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw());
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
