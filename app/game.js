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
		var touchingPlayers;
		for(var i = 0; i  < this.alivePlayers.length; i++) {
			if(this.alivePlayers[i]) {
				this.alivePlayers[i].move(this.wall);

				touchingPlayers = this.playersTouching(this.alivePlayers[i]);
				if(touchingPlayers.length > 0) {
					delete this.alivePlayers[i];
					for(i=0;i<touchingPlayers.length;i++) {
						var index = this.alivePlayers.indexOf(touchingPlayers[i]);
						delete this.alivePlayers[index];
					}
				}
				else if(this.isDead(this.alivePlayers[i])) {
					delete this.alivePlayers[i];
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
				color: this.players[1].color,
				alive: this.alivePlayers.indexOf(this.players[1]) != -1
			},
			player2: {
				x: this.players[2].x,
				y: this.players[2].y,
				color: this.players[2].color,
				alive: this.alivePlayers.indexOf(this.players[2]) != -1
			},
			player3: {
				x: this.players[3].x,
				y: this.players[3].y,
				color: this.players[3].color,
				alive: this.alivePlayers.indexOf(this.players[3]) != -1
			},
			player4: {
				x: this.players[4].x,
				y: this.players[4].y,
				color: this.players[4].color,
				alive: this.alivePlayers.indexOf(this.players[4]) != -1
			}
		}
	}

	this.playersTouching = function(player) {
		var playersTouching = [];
		for(var i=0; i<this.alivePlayers.length; i++) {
			if(this.alivePlayers[i] && player.isTouchingPlayer(this.alivePlayers[i]) && player !== this.alivePlayers[i]) {
				playersTouching.push(this.alivePlayers[i]);
			}
		}
		return playersTouching;
	}

	this.isTouchingBorder = function(player) {
		return player.x > 119 || player.x < 0 || player.y > 119 || player.y < 0;
	}

	this.isDead = function(player) {
		return this.isTouchingBorder(player) ||
			player.isTouchingWall(this.wall)
	}

	this.reset = function(){
		this.wall = []
		this.players[1].reset(10,60,'right');
		this.players[2].reset(110,60,'left');
		this.players[3].reset(60,10,'down');
		this.players[4].reset(60,110,'up');
		this.active = true;

		this.alivePlayers = [];
		for(var i=1; i<=this.maxPlayers; i++) {
			this.alivePlayers.push(this.players[i]);
		}
	}
}

module.exports = new Game();