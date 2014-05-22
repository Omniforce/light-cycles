function Game() {
	this.player1 = require('./player')("blue");
	this.player2 = require('./player')("red");

}

module.exports = new Game();