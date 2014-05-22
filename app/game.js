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
		return this.isTouchingBorder(player) ||
			player.isTouchingWall(this.player1.wall);
	}

	this.resetGame = function(){
		this.player1.wall = []
		this.player1.x = 0;
		this.player1.y = 20;
		this.player1.direction = 'right';
	}
}

module.exports = new Game();