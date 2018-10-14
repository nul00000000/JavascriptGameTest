var context, controller, rectangle, loop, trail;
var width, height;

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

trail = {
	xs:new Array(20),
	ys:new Array(20)
}

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
				controller.right = keyState;
				break;
		}
		
	}
	
};

loop = function() {
	
	var i;
	for (i = xs.length; i > 1; i--) { 
    	xs[i] = xs[i - 1];
		ys[i] = ys[i - 1]
	}
	xs[0] = rectangle.x;
	ys[0] = rectangle.y;
	
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
	
	context.fillStyle = "#202020";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "#ff0000";
	context.fillRect(rectangle.x, rectangle.y, rectangle.width / 2, rectangle.height);
	context.fillStyle = "#0000ff";
	context.fillRect(rectangle.x + rectangle.width / 2, rectangle.y, rectangle.width / 2, rectangle.height);
	context.fillStyle = "#888800";
	var i;
	for (i = 0; i < trail.xs.length; i++) { 
    	context.fillRect(trail.xs[i] + rectangle.width / 2, trail.ys[i] + rectangle.height / 2, 1, 1);
	}	
	window.requestAnimationFrame(loop);
		
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);







