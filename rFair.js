var context, controller, rectangle, loop, nul;
var width, height;
var nulSprite = new Image(), sky = new Image(), ground = new Image();
var idle;
var timer = 0;

nulSprite.src = "RedditNul.png";
sky.src = "sky.png";
ground.src = "grass.png";

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

idle = {
  frames:[new Image(), new Image()],
  frame:0,
  draw:function() {
    context.drawImage(idle.frames[idle.frame], rectangle.x, rectangle.y);
  }
}
idle.frames[0].src = "player1.png";
idle.frames[1].src = "player2.png";

rectangle = {

	height:64,
	jumping:true,
	width:64,
	x:width / 2,
	y:0,
	dy:0

};

nul = {
  height:164,
	width:119,
	x:width / 2 + 100,
	y:height - 174,
}

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
		rectangle.dy -= 10;
		rectangle.jumping = true;
	}

	if(controller.left) {
		rectangle.x -= 6;
	}

	if(controller.right) {
		rectangle.x += 6;
	}

	rectangle.dy += 0.5;
	rectangle.y += rectangle.dy;
	rectangle.dy *= 0.99;

	if(rectangle.y > height - rectangle.height - 10) {
		rectangle.jumping = false;
		rectangle.y = height - rectangle.height - 10;
		rectangle.dy = 0;
	}

	if(rectangle.y < 0) {
		rectangle.y = 0;
		rectangle.dy = 0;
	}

	if(rectangle.x < -rectangle.width) {
		rectangle.x = width;
	} else if(rectangle.x > width) {
		rectangle.x = -rectangle.width;
	}

  if(timer % 50 == 0) {
    idle.frame++;
  }
  if(idle.frame >= 2) {
    idle.frame = 0;
  }
	context.drawImage(sky, 0, 0, width, height);
  context.drawImage(ground, 0, height - 10, width, 10);
  context.drawImage(nulSprite, nul.x, nul.y);
  idle.draw();
  timer++;

	window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
