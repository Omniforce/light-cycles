var express = require('express'),
	http = require('http'),
	app = express(),
	path = require('path');

app.use('/public', express.static(__dirname + '/public'));

var server = http.createServer(app),
	io = require('socket.io').listen(server);

// io.set('log level', 1);
server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var game = require('./app/game.js');
var pointer = require('./app/pointer.js');
var selectTimer;
var gameTimer;
var tickFrequency = 18;
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
					if(game.playerCount >= game.maxPlayers){
						state = 'playing';
						io.sockets.emit('startGame');
						game.reset();
						gameTimer = setInterval(updateGame, tickFrequency);
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
				game.reset();
				reset();
				gameTimer = setInterval(updateGame, tickFrequency);
			}
			else if(socket.player === 1) {
				if(opposites[keyData.key] != game.players[1].direction)
					game.players[1].direction = keyData.key;
			}
			else if(socket.player === 2) {
				if(opposites[keyData.key] != game.players[2].direction)
					game.players[2].direction = keyData.key;
			}
			else if(socket.player === 3) {
				if(opposites[keyData.key] != game.players[3].direction)
					game.players[3].direction = keyData.key;
			}
			else if(socket.player === 4) {
				if(opposites[keyData.key] != game.players[4].direction)
					game.players[4].direction = keyData.key;
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
	});

	gameOver = function(winningPlayer) {
		game.active = false;
		clearInterval(gameTimer); 
		io.sockets.emit("gameOver", winningPlayer);
	}

	updateGame = function() {
		game.tick();

		if(game.isDead(game.players[1])){ gameOver("Player 2"); return; }
		else if(game.isDead(game.players[2])){ gameOver("Player 1"); return; }

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
		game.players[1].active = true;
		socket.player = 1;
		clients["player1"] = game.players[1];
		if (state == "selecting") { selectTimer = setInterval(updatePointer, 18); }
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
	
	if(game.maxPlayers == game.playerCount && !game.active) {
		io.sockets.emit('startGame');
		state = 'playing';
		game.reset();
		gameTimer = setInterval(updateGame, tickFrequency);
	}
}

function canReset() {
	return game.players[1].active 
		&& game.players[2].active 
		&& !game.active;
}