var context, controller, player, loop, nul;
var width, height;
var nulSprite = new Image(), sky = new Image(), ground = new Image();
var idle;
var timer = 0;
var gp;

window.addEventListener("gamepadconnected", function(e) {
  gp = e.gamepad.index;
});

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
    if(!player.right) {
      context.scale(-1, 1);
      context.drawImage(idle.frames[idle.frame], -player.x - player.width, player.y);
      if(!player.right) context.setTransform(1, 0, 0, 1, 0, 0);
    } else {
    context.drawImage(idle.frames[idle.frame], player.x, player.y);
    }
  }
}
idle.frames[0].src = "player1.png";
idle.frames[1].src = "player2.png";

player = {

	height:64,
	jumping:true,
	width:64,
	x:width / 2,
	y:0,
	dy:0,
  right:true

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
  if(navigator.getGamepads()[gp]) {
    controller.up = navigator.getGamepads()[gp].buttons[0].pressed;
  }

	if(controller.up && !player.jumping) {
		player.dy -= 10;
		player.jumping = true;
	}

	if(navigator.getGamepads()[gp].axes[0] < -0.1) {
		player.x += navigator.getGamepads()[gp].axes[0] * 6;
    player.right = false;
	}

	if(navigator.getGamepads()[gp].axes[0] > 0.1) {
		player.x += navigator.getGamepads()[gp].axes[0] * 6;
    player.right = true;
	}

	player.dy += 0.5;
	player.y += player.dy;
	player.dy *= 0.99;

	if(player.y > height - player.height - 10) {
		player.jumping = false;
		player.y = height - player.height - 10;
		player.dy = 0;
	}

	if(player.y < 0) {
		player.y = 0;
		player.dy = 0;
	}

	if(player.x < -player.width) {
		player.x = width;
	} else if(player.x > width) {
		player.x = -player.width;
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
