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
}

module.exports = new Game();