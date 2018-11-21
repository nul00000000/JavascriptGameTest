var context, controller, rectangle, loop;
var width, height;
var score = 0, coinX = 0, coinY = 0, monster, highscore = 0;
var gamepad;

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

class Monster {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	update(rx, ry) {
		this.x += (rx - this.x) / 20;
		this.y += (ry - this.y) / 20;
	}

	draw(ctx) {
		ctx.fillStyle = "#45ee12";
		ctx.fillRect(this.x - 20, this.y - 20, 80, 80);
	}

	checkCollide(x, y, w, h) {
		return x < this.x + 60 && x > this.x - 20 - w && y < this.y + 60 && y > this.y - 20 - h;
	}
}

monster = new Monster(100, 100);

coinX = Math.random() * (width - 41);
coinY = Math.random() * (height - 41);

rectangle = {

	height:32,
	jumping:true,
	width:32,
	x:width / 2,
	dx:0,
	y:0,
	dy:0

};

controller = {

	left:false,
	right:false,
	up:false,
	down:false,
	keyListener:function(event) {

		var keyState = event.type == "keydown";

		switch(event.keyCode) {

			case 37:
				controller.left = keyState;
				break;
			case 38:
				controller.up = keyState;
				break;
			case 39:
				controller.right = keyState;
				break;
			case 40:
				controller.down = keyState;
				break;
		}

	}

};

loop = function() {

	if(controller.up) {
		rectangle.dy -= 1;
		rectangle.jumping = true;
	}

	if(controller.left) {
		rectangle.dx -= 0.5;
	}

	if(controller.right) {
		rectangle.dx += 0.5;
	}
	if(controller.down) {
		rectangle.dy += 1;
	}

	if(gamepad != null && !controller.right && !controller.left) {
		rectangle.dx += navigator.getGamepads()[gamepad].axes[0] / 1.5;
	}
	if(gamepad != null && !controller.up && !controller.down) {
		rectangle.dy += navigator.getGamepads()[gamepad].axes[1];
	}

	rectangle.dy += 0.5;
	rectangle.x += rectangle.dx;
	rectangle.y += rectangle.dy;
	rectangle.dx *= 0.99;
	rectangle.dy *= 0.99;

	if(rectangle.y > height - 32) {
		rectangle.jumping = false;
		rectangle.y = height - 32;
		rectangle.dy = 0;
		rectangle.dx *= 0.91;
	}

	if(rectangle.y < 0) {
		rectangle.y = 0;
		rectangle.dy = 0;
		rectangle.dx *= 0.91;
	}

	if(rectangle.x < -32) {
		rectangle.x = width;
	} else if(rectangle.x > width) {
		rectangle.x = -32;
	}

	if(rectangle.x < coinX + 40 && rectangle.x > coinX - rectangle.width && rectangle.y < coinY + 40 && rectangle.y > coinY - rectangle.height) {
		score++;
		coinX = Math.random() * (width - 41);
		coinY = Math.random() * (height - 41);
	}

	monster.update(rectangle.x, rectangle.y);

	if(monster.checkCollide(rectangle.x, rectangle.y, rectangle.width, rectangle.height)) {
		score = 0;
	}

	if(highscore < score) {
		highscore = score;
	}

	if(score > localStorage.getItem("high")) {
		localStorage.setItem("high", score);
	}

	context.fillStyle = "#202020";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "#ffff00";
	context.fillRect(coinX, coinY, 40, 40);
	context.fillStyle = "#ff0000";
	context.fillRect(rectangle.x, rectangle.y, rectangle.width / 2, rectangle.height);
	context.fillStyle = "#0000ff";
	context.fillRect(rectangle.x + rectangle.width / 2, rectangle.y, rectangle.width / 2, rectangle.height);
	context.fillStyle = "#888800";
	monster.draw(context);
	context.fillStyle = "#ffffff";
	context.font = "30px Arial";
	context.fillText("Score: " + score, 100, 100);
	context.fillText("Highscore: " + highscore, 800, 100);
	context.fillText("Global Highscore: " + localStorage.getItem("high"), 100, height - 100);
	window.requestAnimationFrame(loop);

};

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
	gamepad = e.gamepad.index;
});
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
