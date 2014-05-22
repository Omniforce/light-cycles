function Game() {
	this.player1 = require('./player')("blue", "right");
	// this.player2 = require('./player')("red");

	this.tick = function() {
		this.player1.move();
	}

	this.jsonifyGame = function() {
		return {
			x: this.player1.x,
			y: this.player1.y,
			color: this.player1.color
		}
	}

	this.isTouchingBorder = function(player) {
		return player.x > 119 || player.x < 0 || player.y > 119 || player.y < 0;
	}

	this.isDead = function(player) {
		console.log(player.isTouchingWall(this.player1.wall));
		return this.isTouchingBorder(player) ||
			player.isTouchingWall(this.player1.wall);
	}
}

module.exports = new Game();