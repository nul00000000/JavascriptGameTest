var context, controller, player, loop;
var width, height;
var sky = new Image(), ground = new Image();
var jump = new Image();
var idle;
var timer = 0;
var level = 0;
var lev1;

sky.src = "sky.png";
ground.src = "grass.png";
jump.src = "playerJump.png";

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

lev1 = {
  draw:function() {
    
  }
}

lev1.nulSprite.src = "RedditNul.png";

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

	if(controller.up && !player.jumping) {
		player.dy -= 10;
		player.jumping = true;
	}

	if(controller.left) {
		player.x -= 6;
    player.right = false;
	}

	if(controller.right) {
		player.x += 6;
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
  if(level == 0) {
    lev1.draw();
  }
  if(!player.jumping) {
    idle.draw();
  } else {
    if(!player.right) {
      context.scale(-1, 1);
      context.drawImage(jump, -player.x - player.width, player.y);
      if(!player.right) context.setTransform(1, 0, 0, 1, 0, 0);
    } else {
    context.drawImage(jump, player.x, player.y);
    }
  }
  timer++;

	window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
