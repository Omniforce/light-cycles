function Player(color, direction) {
	this.active = false;
	this.direction = direction;
	this.color = color;
	this.x = 0;
	this.y = 20;
	this.wall = [];

	this.move = function() {
		this.wall.push({ x: this.x, y: this.y });

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
			console.log(seg.x, seg.y);
			if(seg.x == x && seg.y == y) { isTouching = true; }
		});
		return isTouching;
	}
}

module.exports = function(color, direction) {
	return new Player(color, direction);
}