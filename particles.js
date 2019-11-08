var context;

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

class Particle {
	var x1, y1, x2, y2, dx1, dy1, dx2, dy2;
	constructor(x1p, y1p, x2p, y2p) {
		x1 = x1p;
		y1 = y1p;
		x2 = x2p;
		y2 = y2p;
	}
	constructor() {
		x1 = Math.random() * (width - 4) + 2;
		y1 = Math.random() * (height - 4) + 2;
		a = Math.random() * 2 * Math.PI;
		x2 = Math.sin(a) + x1;
		y2 = Math.cos(a) + y1;
	}
	update() {
		x1 += dx1;
		y1 += dy1;
		x2 += dx2;
		y2 += dy2;
	}
	draw(ctx) {
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

particles = [new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(),
new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(),
new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(),
new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(),
new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(), new Particle(),
new Particle(), new Particle(), new Particle()];

particleUpdate(value) {
	for (i = 0; i < particles.length; i++) {
		value.dx1 += (particles[i].x1 - value.x1) * 0.01;
		value.dy1 += (particles[i].y1 - value.y1) * 0.01;
		value.dx2 += (particles[i].x2 - value.x2) * 0.01;
		value.dy2 += (particles[i].y2 - value.y2) * 0.01;
  	}
}

loop = function() {
	
}
