const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

function Raindrop(x, y, speed, length) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.length = length;
}

Raindrop.prototype.update = function() {
    this.y += this.speed;
    if (this.y > canvas.height) {
        this.y = 0 - this.length;
        this.x = Math.random() * canvas.width;
    }
};

Raindrop.prototype.draw = function() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
};

function initRaindrops(num) {
    for (let i = 0; i < num; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = Math.random() * 4 + 1;
        let length = Math.random() * 20 + 10;
        raindrops.push(new Raindrop(x, y, speed, length));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops.forEach(raindrop => {
        raindrop.update();
        raindrop.draw();
    });
    requestAnimationFrame(animate);
}

initRaindrops(100);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
