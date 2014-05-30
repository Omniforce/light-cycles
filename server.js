var express = require('express'),
	http = require('http'),
	app = express(),
	path = require('path');

app.use('/public', express.static(__dirname + '/public'));

var server = http.createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var game = require('./app/game.js');
var pointer = require('./app/pointer.js');

var tickFrequency = 18;
var selectTimer;
var selectTimerRunning = false;
var gameTimer;

var clients = {
	"player1": false,
	"player2": false,
	"player3": false,
	"player4": false
};
var state = "selecting"; // can be "selecting", "waiting", "playing"

io.sockets.on('connection', function(socket) {
	socket.on('newPlayer', function() {
		addPlayer(socket);
	});

	socket.on('nameChange',function(data){

		user_name = JSON.parse(data);

		if(socket.player === 1) {
			game.players[1].player = user_name.new_name;
		}
		else if(socket.player === 2) {
			game.players[2].player = user_name.new_name;
		}
		else if(socket.player === 3) {
			game.players[3].player = user_name.new_name;
		}
		else if(socket.player === 4) {
			game.players[4].player = user_name.new_name;
		}
	});

	socket.on('keyPress', function(data) {

		opposites = {
			"up": "down",
			"left": "right",
			"down": "up",
			"right": "left"
		}

		keyData = JSON.parse(data);

		if(state === "selecting") {
			if (socket.player === 1) {
				if(keyData.key === "enter") {
					game.maxPlayers = pointer.selection;
					clearInterval(selectTimer);
					selectTimerRunning = false;
					if(game.playerCount >= game.maxPlayers){
						startGame();
					} else{
						state = "waiting";
						io.sockets.emit('waiting');
					}	
				} else {
					pointer.move(keyData.key);
				}
			}
		} else if(state === "waiting") {
		} else {
			if(keyData.key === "r" && canReset()) {
				startGame();
			}
			if(socket.player === 1 && keyData.key === "b" && canReset()) {
				state = 'selecting';
				reset();
				selectTimer = setInterval(updatePointer, 100);
				selectTimerRunning = true;
			}
			if(keyData.key == "up" || keyData.key == "down" || keyData.key == "left" || keyData.key == "right"){
				if(socket.player === 1) {
					if(opposites[keyData.key] != game.players[1].previousDirection)
						game.players[1].direction = keyData.key;
				}
				else if(socket.player === 2) {
					if(opposites[keyData.key] != game.players[2].previousDirection)
						game.players[2].direction = keyData.key;
				}
				else if(socket.player === 3) {
					if(opposites[keyData.key] != game.players[3].previousDirection)
						game.players[3].direction = keyData.key;
				}
				else if(socket.player === 4) {
					if(opposites[keyData.key] != game.players[4].previousDirection)
						game.players[4].direction = keyData.key;
				}
			}
		}
	});

	socket.on('disconnect', function(){
		game.active = false;

		for(var i = 1; i <= 4; i++) {
			if(socket.player === i) {
				clients["player"+i] = false;
				clearInterval(gameTimer);
				game.playerCount--;
			}
		}

		if(noPlayers()) {
			clearInterval(selectTimer);
			selectTimerRunning = false;
			clearInterval(gameTimer);
			state = 'selecting';
			reset();
		}
	});

	gameOver = function(socket, currentPlayer, winningPlayer) {
		game.active = false;
		clearInterval(gameTimer); 

		var json = {
			currentPlayer: currentPlayer,
			winningPlayer: winningPlayer
		};
		socket.emit("gameOver", JSON.stringify(json));
	}

	updateGame = function() {
		var walls = game.tick();
		var playersLeft = game.playersLeft();

		if(walls && playersLeft > 1) {
			io.sockets.emit("death", walls);
		}

		if(playersLeft <= 1) {
			var lastPlayer = game.lastPlayer();
			var users = io.sockets.connected;

			Object.keys(users).forEach(function (key) { 
				var socket = users[key]
			 	var currentPlayer = socket.player;
				lastPlayer ? gameOver(socket, currentPlayer, lastPlayer.player) : gameOver(socket, currentPlayer);
			});

			return;
		}

		io.sockets.emit("updateGame", JSON.stringify(game.jsonifyGame()));
	}

	reset = function() {
		io.sockets.emit("reset");
	}

	updatePointer = function() {
		io.sockets.emit("updatePointer", JSON.stringify({ selection: pointer.selection }));
		console.log(state);
	}
});

function addPlayer(socket) {
	if(!clients["player1"]) {
		game.players[1].active = true;
		socket.player = 1;
		clients["player1"] = game.players[1];
		if (state == "selecting" && !selectTimerRunning) { selectTimer = setInterval(updatePointer, 100); selectTimerRunning = true; }
		game.playerCount++;
	} else if(!clients["player2"]) {
		game.players[2].active = true;
		socket.player = 2;
		clients["player2"] = game.players[2];
		game.playerCount++;
	} else if(!clients["player3"]) {
		game.players[3].active = true;
		socket.player = 3;
		clients["player3"] = game.players[3];
		game.playerCount++;
	} else if(!clients["player4"]) {
		game.players[4].active = true;
		socket.player = 4;
		clients["player4"] = game.players[4];
		game.playerCount++;
	}

	if(state == "waiting") {
		socket.emit('waiting');
	} else if(state == "playing") {
		socket.emit('reset');
	}
	
	if(game.maxPlayers == game.playerCount && !game.active) {
		startGame();
	}
}

function startGame() {
	game.reset();
	io.sockets.emit('startGame', JSON.stringify(game.jsonifyGame()));
	state = 'playing'
	gameTimer = setInterval(updateGame, tickFrequency);
}

function canReset() {
	return game.players[1].active 
		&& game.players[2].active 
		&& !game.active;
}

function noPlayers() {
	return !(clients["player1"] || clients["player2"] || clients["player3"] || clients["player4"]);
}