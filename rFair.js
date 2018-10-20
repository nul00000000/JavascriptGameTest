var context, controller, rectangle, loop;
var width, height;
var playerSprite = new Image(), nulSprite = new Image();
playerSprite.src = "player.png";
nulSprite.src = "RedditNul.png";

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

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
			// case 40:
			// 	controller.down = keyState;
			// 	break;
		}

	}

};

loop = function() {

	if(controller.up && !rectangle.jumping) {
		rectangle.dy -= 210;
		rectangle.jumping = true;
	}

	if(controller.left) {
		rectangle.dx -= 0.5;
	}

	if(controller.right) {
		rectangle.dx += 0.5;
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
		rectangle.dx *= 0.5;
	}

	if(rectangle.y < 0) {
		rectangle.y = 0;
		rectangle.dy = 0;
		rectangle.dx *= 0.5;
	}

	if(rectangle.x < -32) {
		rectangle.x = width;
	} else if(rectangle.x > width) {
		rectangle.x = -32;
	}

	context.fillStyle = "#202020";
	context.fillRect(0, 0, width, height);
  context.drawImage(playerSprite, 100, 100);

	window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
