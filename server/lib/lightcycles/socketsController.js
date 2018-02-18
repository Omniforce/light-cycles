'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _enums = require('./utils/enums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketsController = function () {
  function SocketsController(io, countdownSpeed, tickSpeed) {
    _classCallCheck(this, SocketsController);

    this.clients = [];
    this.io = io;

    this.countdownSpeed = countdownSpeed;
    this.tickSpeed = tickSpeed;

    this.tickTimer = null;
    this.countdownTimer = null;

    this.game = new _game2.default();
    this.menu = new _menu2.default();
  }

  // ------------------------------------
  // |              SETUP               |
  // ------------------------------------

  _createClass(SocketsController, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      this.io.on('connection', function (socket) {
        _this.connect(socket);

        socket.on('updateName', function (name) {
          _this.updateName(socket, name);
        });
        socket.on('updateColor', function (color) {
          _this.updateColor(socket, color);
        });
        socket.on('ready', function () {
          _this.ready(socket);
        });
        socket.on('keyPress', function (key) {
          _this.keyPress(socket, key);
        });
        socket.on('disconnect', function () {
          _this.disconnect(socket);
        });
      });
    }
  }, {
    key: 'ready',
    value: function ready(socket) {
      var player = this.game.getPlayer(socket);
      if (player) {
        player.ready = !player.ready;
        this.sendPlayers();
        this.tryStartingGame();
      }
    }
  }, {
    key: 'tryStartingGame',
    value: function tryStartingGame() {
      if (this.game.gameState === _enums.gameStates.waiting) {
        var readyPlayers = this.game.getReadyPlayers();
        if (readyPlayers.length >= this.game.selectedMaxPlayers) {
          this.game.gameState = _enums.gameStates.intro;
          this.startIntro(3);
        } else {
          this.io.emit('waiting');
        }
      }
    }
  }, {
    key: 'startIntro',
    value: function startIntro(secondsLeft) {
      var _this2 = this;

      this.countdownTimer = setInterval(function () {
        if (secondsLeft > 0) {
          _this2.sendIntro(secondsLeft);
          secondsLeft = secondsLeft - 1;
        } else {
          clearInterval(_this2.countdownTimer);
          _this2.startGame();
        }
      }, this.countdownSpeed);
    }

    // startIntro(time) {
    //   if (time > 0) {
    //     setTimeout(() => {
    //       this.io.emit('countdown', time);
    //       this.startIntro(time-1);
    //     }, this.countdownSpeed);
    //   } else {
    //     this.startGame();
    //   }
    // }

  }, {
    key: 'startGame',
    value: function startGame() {
      var _this3 = this;

      this.game.gameState = _enums.gameStates.playing;
      this.game.resetGame();

      this.tickTimer = setInterval(function () {
        _this3.tick();
      }, this.tickSpeed);
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var alivePlayers = this.game.getAlivePlayers();
      this.io.emit('gameOver', JSON.stringify(alivePlayers));
    }
  }, {
    key: 'noClients',
    value: function noClients() {
      return this.clients.length < 1;
    }

    // ------------------------------------
    // |          SOCKET ACTIONS          |
    // ------------------------------------

  }, {
    key: 'connect',
    value: function connect(socket) {
      this.clients.push(socket);

      this.game.addPlayer(socket);
      this.sendPlayers();

      this.catchUp(socket);
    }
  }, {
    key: 'disconnect',
    value: function disconnect(socket) {
      var i = this.clients.indexOf(socket);
      if (i > -1) {
        this.clients.splice(i, 1);
      }

      var player = this.game.getPlayer(socket);
      this.game.removePlayer(socket);
      this.game.removePlayersWalls(player);
      this.sendPlayers();

      if (this.noClients()) {
        this.game.gameState = _enums.gameStates.menu;
        this.menu.selection = 2;
      }
    }
  }, {
    key: 'keyPress',
    value: function keyPress(socket, key) {
      if (!this.game.isPlayer(socket)) {
        return;
      }

      var gameState = this.game.gameState;

      switch (gameState) {
        case _enums.gameStates.menu:
          if (key === 13) {
            this.game.selectedMaxPlayers = this.menu.selection;
            this.game.gameState = _enums.gameStates.waiting;
            this.tryStartingGame();
          } else {
            this.menu.updateSelection(key);
            this.io.emit('updateSelection', this.menu.selection);
          }
          break;
        case _enums.gameStates.waiting:
          if (key == 66) {
            this.game.gameState = _enums.gameStates.menu;
            this.io.emit('updateSelection', this.menu.selection);
          }
          break;
        case _enums.gameStates.playing:
          this.game.changePlayerDirection(socket, key);
          break;
        case _enums.gameStates.completed:
          if (key == 66) {
            this.game.gameState = _enums.gameStates.menu;
            this.io.emit('updateSelection', this.menu.selection);
          }
          break;
        default:
          break;
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      var gameState = this.game.gameState;

      switch (gameState) {
        case _enums.gameStates.playing:
          this.game.tick();
          this.io.emit('updateGame', JSON.stringify(this.game.jsonifyGame()));
          break;
        case _enums.gameStates.completed:
          clearInterval(this.tickTimer);

          this.gameOver();
          break;
        default:
          clearInterval(this.tickTimer);

          this.game.gameState = _enums.gameStates.menu;
          this.menu.selection = 2;
          this.io.emit('updateSelection', this.menu.getSelection());
          break;
      }
    }
  }, {
    key: 'updateName',
    value: function updateName(socket, name) {
      var player = this.game.getPlayer(socket);
      if (player) {
        player.name = name;
      }

      this.sendPlayers();
    }
  }, {
    key: 'updateColor',
    value: function updateColor(socket, color) {
      var player = this.game.getPlayer(socket);
      if (player) {
        player.color = color;
      }

      this.sendPlayers();
    }

    // ------------------------------------
    // |            MESSAGING             |
    // ------------------------------------

  }, {
    key: 'sendPlayers',
    value: function sendPlayers() {
      for (var c = 0; c < this.clients.length; c++) {
        var client = this.clients[c];
        var data = {
          "players": this.game.players,
          "currentPlayer": this.game.getPlayer(client)
        };
        client.emit("updatePlayers", JSON.stringify(data));
      }
    }
  }, {
    key: 'sendIntro',
    value: function sendIntro(secondsLeft) {
      this.io.emit('countdown', secondsLeft);
    }
  }, {
    key: 'catchUp',
    value: function catchUp(socket) {
      var gameState = this.game.gameState;

      switch (gameState) {
        case _enums.gameStates.menu:
          socket.emit('updateSelection', this.menu.selection);
          break;
        case _enums.gameStates.waiting:
          socket.emit('waiting');
          break;
        case _enums.gameStates.playing:
          socket.emit('updateGame', JSON.stringify(this.game.jsonifyGame()));
          break;
        case _enums.gameStates.completed:
          var alivePlayers = this.game.getAlivePlayers();
          socket.emit('gameOver', JSON.stringify(alivePlayers));
          break;
      }
    }
  }]);

  return SocketsController;
}();

exports.default = SocketsController;