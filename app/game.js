function Game() {
	this.active = false;
	this.players = {
		1 : require('./player')("Player 1", 10, 60, "blue", "right"),
		2 : require('./player')("Player 2", 110, 60, "red", "left"),
		3 : require('./player')("Player 3", 60, 10, "green", "down"),
		4 : require('./player')("Player 4", 60, 110, "yellow", "up")
	};
	this.wall = [];
	this.alivePlayers = [];
	this.maxPlayers;
	this.playerCount = 0;

	this.tick = function() {
		for(var i = 0; i  < this.alivePlayers.length; i++) {
			if(this.alivePlayers[i]) {
				this.alivePlayers[i].move(this.wall);

				if(this.isDead(this.alivePlayers[i])) {
					delete this.activePlayers[i];
				}
			}
		}
	}

	this.playersLeft = function() {
		count = 0;
		for(var i = 0; i<this.alivePlayers.length; i++) {
			if(this.alivePlayers[i]) { count++; }
		}
		return count;
	}

	this.lastPlayer = function() {
		for(var i = 0; i<this.alivePlayers.length; i++) {
			if(this.alivePlayers[i]) { return this.alivePlayers[i]; }
		}
	}

	this.jsonifyGame = function() {
		return {
			playerCount: this.playerCount,
			player1: {
				x: this.players[1].x,
				y: this.players[1].y,
				color: this.players[1].color
			},
			player2: {
				x: this.players[2].x,
				y: this.players[2].y,
				color: this.players[2].color
			},
			player3: {
				x: this.players[3].x,
				y: this.players[3].y,
				color: this.players[3].color
			},
			player4: {
				x: this.players[4].x,
				y: this.players[4].y,
				color: this.players[4].color
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
		this.players[1].reset(10,60,'right');
		this.players[2].reset(110,60,'left');
		this.players[3].reset(60,10,'down');
		this.players[4].reset(60,110,'up');
		this.active = true;

		this.alivePlayers = [];
		for(var i=0; i<this.maxPlayers; i++) {
			this.alivePlayers.push(this.players[i]);
		}
	}
}

module.exports = new Game();