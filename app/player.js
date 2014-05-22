function Player(x, y, color, direction) {
	this.active = false;
	this.direction = direction;
	this.color = color;
	this.x = x;
	this.y = y;

	this.reset = function(x,y,direction){
		this.x = x;
		this.y = y;
		this.direction = direction;
	}

	this.move = function(wall) {
		wall.push({ x: this.x, y: this.y });

		switch(this.direction) {
		case "up":
			this.y-=1;
			break;
		case "left":
			this.x-=1;
			break;
		case "down":
			this.y+=1;
			break;
		default: // right
			this.x+=1;
		}
	}

	this.isTouchingWall = function(wall) {
		var x = this.x;
		var y = this.y;

		isTouching = false;
		wall.forEach(function(seg) {
			if(seg.x == x && seg.y == y) { isTouching = true; }
		});
		return isTouching;
	}
}

module.exports = function(x, y, color, direction) {
	return new Player(x, y, color, direction);
}