var context, controller, player, loop, plaguedoctor;
var width, height;
var sky = new Image(), ground = new Image();
var jump = new Image();
var idle, pdidle;
var timer = 0;
var level = 0;
var lev1, lev2, house;

sky.src = "sky.png";
ground.src = "grass.png";
jump.src = "playerJump.png";

context = document.querySelector("canvas").getContext("2d");

width = innerWidth - 20;
height = innerHeight - 20;

context.canvas.height = height;
context.canvas.width = width;

lev1 = {
  house:new Image(),
  sign:new Image(),
  draw:function() {
    context.drawImage(lev1.house, width / 3, height - 266);
    context.drawImage(lev1.sign, width - 200, height - 138);
  }
}

lev1.house.src = "renhouse.png";
lev1.sign.src = "sign.png";

lev2 = {
  showpd1:false,
  showpd2:false,
  pd1:new Image(),
  pd2:new Image(),
  draw:function() {
    pdidle.draw();
    if(lev2.showpd1) {
      console.log("yeet");
      context.drawImage(lev2.pd1, 0, 0);
    }
  }
}

lev2.pd1.src = "pd1.png";
lev2.pd2.src = "pd2.png";

house = {
  inside:new Image(),
  mother:new Image(),
  draw:function() {
    context.drawImage(house.inside, 0, 0);
    context.drawImage(house.mother, width - 200, height - 74);
  }
}

house.inside.src = "house.png";
house.mother.src = "mother.png";

pdidle = {
  frames:[new Image(), new Image()],
  frame:0,
  draw:function() {
    console.log("drawing");
    if(!plaguedoctor.right) {
      context.scale(-1, 1);
      context.drawImage(pdidle.frames[pdidle.frame], -plaguedoctor.x - plaguedoctor.width, plaguedoctor.y);
      context.setTransform(1, 0, 0, 1, 0, 0);
    } else {
    context.drawImage(pdidle.frames[pdidle.frame], plaguedoctor.x, plaguedoctor.y);
    }
  }
}
pdidle.frames[0].src = "plaguedoctor1.png";
pdidle.frames[1].src = "plaguedoctor2.png";

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
  right:true,
  sick:false

};

plaguedoctor = {
  height:64,
	jumping:true,
	width:64,
	x:width / 2,
	y:height - 10 - 64,
	dy:0,
  right:false
};

controller = {

	left:false,
	right:false,
	up:false,
  space:false,
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
      case 32:
        controller.space = keyState;
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
    level--;
		player.x = width;
	} else if(player.x > width) {
    level++;
		player.x = -player.width;
	}

  if(controller.space) {
    if(level == 0 && Math.abs((player.x) - (width / 2)) <= player.width && Math.abs(player.y - (height - 120)) <= player.height) {
      level = -8;
    } else if(level == -8 && Math.abs((player.x - 120) - (width / 4)) <= player.width * 2 && Math.abs(player.y - (height - 120)) <= player.height) {
      level = 0;
    }
    if(level == 1 && !player.sick && Math.abs((player.x) - (width / 2)) <= player.width && Math.abs(player.y - (height - 72)) <= player.height) {
      lev2.showpd1 = true;
    } else if(level == 1 && player.sick && Math.abs((player.x) - (width / 2)) <= player.width && Math.abs(player.y - (height - 72)) <= player.height) {
      lev2.showpd2 = true;
    } else {
      lev2.showpd1 = false;
      lev2.showpd2 = false;
    }
  }

  if(timer % 50 == 0) {
    idle.frame++;
    pdidle.frame++;
  }
  if(idle.frame >= 2) {
    idle.frame = 0;
  }
  if(pdidle.frame >= 2) {
    pdidle.frame = 0;
  }
	context.drawImage(sky, 0, 0, width, height);
  context.drawImage(ground, 0, height - 10, width, 10);
  if(level == 0) {
    lev1.draw();
  } else if(level == 1) {
    lev2.draw();
  } else if(level == -8) {
    house.draw();
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
