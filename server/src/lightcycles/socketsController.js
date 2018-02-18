import Game from './game';
import Menu from './menu';

import { gameStates } from './utils/enums';

class SocketsController {
  constructor(io, countdownSpeed, tickSpeed) {
    this.clients = [];
    this.io = io;

    this.countdownSpeed = countdownSpeed;
    this.tickSpeed = tickSpeed;

    this.tickTimer = null;
    this.countdownTimer = null;

    this.game = new Game();
    this.menu = new Menu();
  }

  // ------------------------------------
  // |              SETUP               |
  // ------------------------------------

  setup() {
    this.io.on('connection', (socket) => {
      this.connect(socket);

      socket.on('updateName', (name) => { this.updateName(socket, name); });
      socket.on('updateColor', (color) => { this.updateColor(socket, color); });
      socket.on('ready', () => { this.ready(socket); });
      socket.on('keyPress', (key) => { this.keyPress(socket, key); });
      socket.on('disconnect', () => { this.disconnect(socket); });
    });
  }

  ready(socket) {
    const player = this.game.getPlayer(socket);
    if (player) {
      player.ready = !player.ready;
      this.sendPlayers();
      this.tryStartingGame();
    }
  }

  tryStartingGame() {
    if (this.game.gameState === gameStates.waiting) {
      const readyPlayers = this.game.getReadyPlayers();
      if (readyPlayers.length >= this.game.selectedMaxPlayers) {
        this.game.gameState = gameStates.intro;
        this.startIntro(3);
      } else {
        this.io.emit('waiting');
      }
    }
  }

  startIntro(secondsLeft) {
    this.countdownTimer = setInterval(() => {
      if (secondsLeft > 0) {
        this.sendIntro(secondsLeft);
        secondsLeft = secondsLeft - 1;
      } else {
        clearInterval(this.countdownTimer);
        this.startGame();
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

  startGame() {
    this.game.gameState = gameStates.playing;
    this.game.resetGame();

    this.tickTimer = setInterval(() => {
      this.tick();
    }, this.tickSpeed);
  }

  gameOver() {
    const alivePlayers = this.game.getAlivePlayers();
    this.io.emit('gameOver', JSON.stringify(alivePlayers));
  }

  noClients() {
    return this.clients.length < 1;
  }

  // ------------------------------------
  // |          SOCKET ACTIONS          |
  // ------------------------------------

  connect(socket) {
    this.clients.push(socket);

    this.game.addPlayer(socket);
    this.sendPlayers();

    this.catchUp(socket);
  }

  disconnect(socket) {
    const i = this.clients.indexOf(socket);
    if (i > -1) { this.clients.splice(i, 1); }

    const player = this.game.getPlayer(socket);
    this.game.removePlayer(socket);
    this.game.removePlayersWalls(player);
    this.sendPlayers();

    if (this.noClients()) {
      this.game.gameState = gameStates.menu;
      this.menu.selection = 2;
    }
  }

  keyPress(socket, key) {
    if (!this.game.isPlayer(socket)) { return; }

    const gameState = this.game.gameState;

    switch(gameState) {
      case gameStates.menu:
        if (key === 13) {
          this.game.selectedMaxPlayers = this.menu.selection;
          this.game.gameState = gameStates.waiting;
          this.tryStartingGame();
        } else {
          this.menu.updateSelection(key);
          this.io.emit('updateSelection', this.menu.selection);
        }
        break;
      case gameStates.waiting:
        if (key == 66) {
          this.game.gameState = gameStates.menu;
          this.io.emit('updateSelection', this.menu.selection);
        }
        break;
      case gameStates.playing:
        this.game.changePlayerDirection(socket, key);
        break;
      case gameStates.completed:
        if (key == 66) {
          this.game.gameState = gameStates.menu;
          this.io.emit('updateSelection', this.menu.selection);
        }
        break;
      default:
        break;
    }
  }

  tick() {
    const gameState = this.game.gameState;

    switch (gameState) {
      case gameStates.playing:
        this.game.tick();
        this.io.emit('updateGame', JSON.stringify(this.game.jsonifyGame()));
        break;
      case gameStates.completed:
        clearInterval(this.tickTimer);

        this.gameOver();
        break;
      default:
        clearInterval(this.tickTimer);

        this.game.gameState = gameStates.menu;
        this.menu.selection = 2;
        this.io.emit('updateSelection', this.menu.getSelection());
        break;
    }
  }

  updateName(socket, name) {
    const player = this.game.getPlayer(socket);
    if (player) { player.name = name; }

    this.sendPlayers();
  }

  updateColor(socket, color) {
    const player = this.game.getPlayer(socket);
    if (player) { player.color = color; }

    this.sendPlayers();
  }

  // ------------------------------------
	// |            MESSAGING             |
	// ------------------------------------

  sendPlayers() {
    for(let c = 0; c < this.clients.length; c++) {
      let client = this.clients[c];
      let data = {
        "players": this.game.players,
        "currentPlayer": this.game.getPlayer(client)
      }
      client.emit("updatePlayers", JSON.stringify(data));
    }
  }

  sendIntro(secondsLeft) {
    this.io.emit('countdown', secondsLeft);
  }

  catchUp(socket) {
    const gameState = this.game.gameState;

    switch(gameState) {
      case gameStates.menu:
        socket.emit('updateSelection', this.menu.selection);
        break;
      case gameStates.waiting:
        socket.emit('waiting');
        break;
      case gameStates.playing:
        socket.emit('updateGame', JSON.stringify(this.game.jsonifyGame()));
        break;
      case gameStates.completed:
        const alivePlayers = this.game.getAlivePlayers();
        socket.emit('gameOver', JSON.stringify(alivePlayers));
        break;
    }
  }
}

export default SocketsController;
