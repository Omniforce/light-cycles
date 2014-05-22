function Player(color) {
	this.active = false;
	this.direction = "";
	this.color = color;
	this.x = 0;
	this.y = 0;
	this.wall = [];
}

module.exports = function(color) {
	return new Player(color);
}