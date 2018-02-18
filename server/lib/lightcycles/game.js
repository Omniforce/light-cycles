'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enums = require('./utils/enums');

var _helpers = require('./utils/helpers');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.MAX_PLAYERS = 4;

    this.players = [];
    this.selectedPlayerCount = 4;
    this.gameState = _enums.gameStates.menu;

    this.walls = [];
    this.width = 120;
    this.height = 120;
  }

  // ------------------------------------
  // |             PLAYERS              |
  // ------------------------------------

  _createClass(Game, [{
    key: 'addPlayer',
    value: function addPlayer(socket) {
      if (this.players.length < this.MAX_PLAYERS) {
        var newPlayer = new _player2.default();

        socket.playerId = newPlayer.uuid;
        this.players.push(newPlayer);
      }
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(socket) {
      var i = this.getPlayerIndex(socket);
      if (i > -1) {
        this.players.splice(i, 1);
      }
    }
  }, {
    key: 'getPlayer',
    value: function getPlayer(socket) {
      return this.players.find(function (player) {
        return player.uuid == socket.playerId;
      });
    }
  }, {
    key: 'isPlayer',
    value: function isPlayer(socket) {
      return this.getPlayerIndex(socket) > -1;
    }
  }, {
    key: 'getReadyPlayers',
    value: function getReadyPlayers() {
      return this.players.filter(function (player) {
        return player.isReady();
      });
    }
  }, {
    key: 'getAlivePlayers',
    value: function getAlivePlayers() {
      return this.players.filter(function (player) {
        return player.isAlive();
      });
    }
  }, {
    key: 'atMaxPlayers',
    value: function atMaxPlayers() {
      return this.players.length >= this.MAX_PLAYERS;
    }
  }, {
    key: 'changePlayerDirection',
    value: function changePlayerDirection(socket, key) {
      var currentPlayer = this.getPlayer(socket);
      var newDirection = _helpers.keyToDirection[key];

      if (newDirection != this.getOppositeDirection(currentPlayer.previousDirection)) {
        currentPlayer.direction = newDirection;
      }
    }
  }, {
    key: 'getPlayerIndex',
    value: function getPlayerIndex(socket) {
      return this.players.findIndex(function (player) {
        return player.uuid == socket.playerId;
      });
    }
  }, {
    key: 'getOppositeDirection',
    value: function getOppositeDirection(direction) {
      switch (direction) {
        case _enums.directions.up:
          return _enums.directions.down;
        case _enums.directions.left:
          return _enums.directions.right;
        case _enums.directions.down:
          return _enums.directions.up;
        default:
          // right
          return _enums.directions.left;
      }
    }

    // ------------------------------------
    // |             Gameplay             |
    // ------------------------------------

  }, {
    key: 'resetGame',
    value: function resetGame() {
      this.walls = [];

      var readyPlayers = this.getReadyPlayers();
      for (var p = 0; p < readyPlayers.length; p++) {
        var player = readyPlayers[p];
        var _startingPlayerStates = _helpers.startingPlayerStates[p],
            x = _startingPlayerStates.x,
            y = _startingPlayerStates.y,
            direction = _startingPlayerStates.direction;


        player.reset(x, y, direction);
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      var alivePlayers = this.getAlivePlayers();

      for (var p = 0; p < alivePlayers.length; p++) {
        var player = alivePlayers[p];
        player.move(this.walls);

        if (player.hasLeftBoundries(this.width, this.height) || player.hasHitWall(this.walls)) {
          player.alive = false;
          this.removePlayersWalls(player);
        }

        for (var op = 0; op < alivePlayers.length; op++) {
          var otherPlayer = alivePlayers[op];
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
        this.gameState = _enums.gameStates.completed;
      }
    }
  }, {
    key: 'jsonifyGame',
    value: function jsonifyGame() {
      var plist = [];

      var alivePlayers = this.getAlivePlayers();
      for (var p = 0; p < alivePlayers.length; p++) {
        var player = this.players[p];
        plist.push({
          x: player.x,
          y: player.y,
          color: player.color,
          alive: player.alive
        });
      }

      return { walls: this.walls, players: plist };
    }
  }, {
    key: 'removePlayersWalls',
    value: function removePlayersWalls(player) {
      this.walls = this.walls.filter(function (segment) {
        return player.uuid != segment.playerId;
      });
    }
  }]);

  return Game;
}();

exports.default = Game;