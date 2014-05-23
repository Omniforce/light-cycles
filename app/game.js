function Game() {
	this.active = false;
	this.player1 = require('./player')(10, 60, "blue", "right");
	this.player2 = require('./player')(110, 60, "red", "left");
	this.wall;

	this.tick = function() {
		this.player1.move(this.wall);
		this.player2.move(this.wall);
	}

	this.jsonifyGame = function() {
		return {
			player1: {
				x: this.player1.x,
				y: this.player1.y,
				color: this.player1.color
			},
			player2: {
				x: this.player2.x,
				y: this.player2.y,
				color: this.player2.color
			}
		}
	}

	this.isTouchingBorder = function(player) {
		return player.x > 119 || player.x < 0 || player.y > 119 || player.y < 0;
	}

	this.isDead = function(player) {
		return this.isTouchingBorder(player) ||
			player.isTouchingWall(this.wall);
	}

	this.reset = function(){
		this.wall = []
		this.player1.reset(10,60,'right');
		this.player2.reset(110,60,'left');
		this.active = true;
	}
}

module.exports = new Game();