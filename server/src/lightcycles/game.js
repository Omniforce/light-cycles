import { gameStates, directions } from './utils/enums';
import { keyToDirection, startingPlayerStates } from './utils/helpers';

import Player from './player';

class Game {
  constructor() {
    this.MAX_PLAYERS = 4;

    this.players = [];
    this.selectedPlayerCount = 4;
    this.gameState = gameStates.menu;

    this.walls = [];
    this.width = 120;
    this.height = 120;
  }

  // ------------------------------------
	// |             PLAYERS              |
	// ------------------------------------

  addPlayer(socket) {
    if (this.players.length < this.MAX_PLAYERS) {
      const newPlayer = new Player();

      socket.playerId = newPlayer.uuid;
      this.players.push(newPlayer);
    }
  }

  removePlayer(socket) {
    const i = this.getPlayerIndex(socket);
    if (i > -1) {
      this.players.splice(i, 1);
    }
  }

  getPlayer(socket) {
    return this.players.find((player) => {
      return player.uuid == socket.playerId;
    });
  }

  isPlayer(socket) {
    return this.getPlayerIndex(socket) > -1;
  }

  getReadyPlayers() {
    return this.players.filter((player) => {
      return player.isReady();
    });
  }

  getAlivePlayers() {
    return this.players.filter((player) => {
      return player.isAlive();
    });
  }

  atMaxPlayers() {
    return this.players.length >= this.MAX_PLAYERS;
  }

  changePlayerDirection(socket, key) {
    const currentPlayer = this.getPlayer(socket);
    const newDirection = keyToDirection[key];

    if (newDirection != this.getOppositeDirection(currentPlayer.previousDirection)) {
      currentPlayer.direction = newDirection;
    }
  }

  getPlayerIndex(socket) {
    return this.players.findIndex((player) => {
      return player.uuid == socket.playerId;
    });
  }

  getOppositeDirection(direction) {
    switch(direction) {
      case directions.up:
        return directions.down;
      case directions.left:
        return directions.right;
      case directions.down:
        return directions.up;
      default: // right
        return directions.left;
    }
  }

  // ------------------------------------
	// |             Gameplay             |
	// ------------------------------------

  resetGame() {
    this.walls = [];

    const readyPlayers = this.getReadyPlayers();
    for(let p = 0; p < readyPlayers.length; p++) {
      let player = readyPlayers[p];
      let { x, y, direction } = startingPlayerStates[p];

      player.reset(x, y, direction);
    }
  }

  tick() {
    let alivePlayers = this.getAlivePlayers();

    for(let p = 0; p < alivePlayers.length; p++) {
      let player = alivePlayers[p];
      player.move(this.walls);

      if (player.hasLeftBoundries(this.width, this.height) || player.hasHitWall(this.walls)) {
        player.alive = false;
        this.removePlayersWalls(player);
      }

      for(let op = 0; op < alivePlayers.length; op++) {
        let otherPlayer = alivePlayers[op];
        if (player != otherPlayer && player.isTouchingPlayer(otherPlayer)) {
          player.alive = false;
          this.removePlayersWalls(player);

          otherPlayer.alive = false;
          this.removePlayersWalls(otherPlayer);
        }
      }
    }

    alivePlayers = this.getAlivePlayers();
    if (alivePlayers.length < 2) {
      this.gameState = gameStates.completed;
    }
  }

  jsonifyGame() {
    const plist = [];

    const alivePlayers = this.getAlivePlayers();
    for(let p = 0; p < alivePlayers.length; p++) {
      let player = this.players[p];
      plist.push({
        x: player.x,
        y: player.y,
        color: player.color,
        alive: player.alive
      });
    }

    return { walls: this.walls, players: plist };
  }

  removePlayersWalls(player) {
    this.walls = this.walls.filter(function(segment) {
      return player.uuid != segment.playerId;
    });
  }
}

export default Game;
