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
var selectTimer;
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
		if(!game.player1.active || !game.player2.active) {
			addPlayer(socket);
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
					state = "waiting";
					clearInterval(selectTimer);
					io.sockets.emit('waiting');
				} else {
					pointer.move(keyData.key);
				}
			}
		} else if(state === "waiting") {

		} else {
			if(keyData.key === "r" && canReset()) {
				game.reset();
				reset();
				gameTimer = setInterval(updateGame, 18);
			}
			else if(socket.player === 1) {
				if(opposites[keyData.key] != game.player1.direction)
					game.player1.direction = keyData.key;
			}
			else if(socket.player === 2) {
				if(opposites[keyData.key] != game.player2.direction)
					game.player2.direction = keyData.key;
			}
		}
	});

	socket.on('disconnect', function(){
		game.active = false;
		if (game.maxPlayers >= 2) {
			if(socket.player === 1) { clients["player1"] = false; clearInterval(gameTimer); game.playerCount--; }
			if(socket.player === 2) { clients["player2"] = false; clearInterval(gameTimer); playerCount--;}
		}
		if (game.maxPlayers >= 3) {
			if(socket.player === 3) { clients["player3"] = false; clearInterval(gameTimer); playerCount--;}
		}
		if (game.maxPlayers >= 4) {
			if(socket.player === 4) { clients["player4"] = false; clearInterval(gameTimer); playerCount--;}
		}
	});

	gameOver = function(winningPlayer) {
		game.active = false;
		clearInterval(gameTimer); 
		io.sockets.emit("gameOver", winningPlayer);
	}

	updateGame = function() {
		game.tick();

		if(game.isDead(game.player1)){ gameOver("Player 2"); return; }
		else if(game.isDead(game.player2)){ gameOver("Player 1"); return; }

		io.sockets.emit("updateGame", JSON.stringify(game.jsonifyGame()));
	}

	reset = function() {
		io.sockets.emit("reset");
	}

	updatePointer = function() {
		io.sockets.emit("updatePointer", JSON.stringify({ selection: pointer.selection }));
	}
});

function addPlayer(socket) {
	if(!clients["player1"]) {
		game.player1.active = true;
		socket.player = 1;
		clients["player1"] = game.player1;
		selectTimer = setInterval(updatePointer, 18);
		game.playerCount++;
	} else if(!clients["player2"]) {
		game.player2.active = true;
		socket.player = 2;
		clients["player2"] = game.player2;
		game.playerCount++;
	} else if(!clients["player3"]) {
		game.player3.active = true;
		socket.player = 3;
		clients["player3"] = game.player3;
		game.playerCount++;
	} else if(!clients["player4"]) {
		game.player4.active = true;
		socket.player = 4;
		clients["player4"] = game.player4;
		game.playerCount++;
	}

	if(game.maxPlayers == game.playerCount && !game.active) {
		io.sockets.emit('startGame');
		game.reset();
		gameTimer = setInterval(updateGame, 18);
	}
}

function canReset() {
	return game.player1.active 
		&& game.player2.active 
		&& !game.active;
}