function Game() {
	this.player1 = require('./player')("blue", "right");
	// this.player2 = require('./player')("red");

	this.tick = function() {
		this.player1.move();
		this.playerTouchingBorder(this.player1);
	}

	this.jsonifyGame = function() {
		return {
			x: this.player1.x,
			y: this.player1.y,
			color: this.player1.color
		}
	}

	this.playerTouchingBorder = function(player) {
		if(player.x > 119){player.x = 119; }
		if(player.x < 0){player.x = 0; }
		if(player.y > 119){player.y = 119; }
		if(player.y < 0){player.y = 0; }
	}
}

module.exports = new Game();