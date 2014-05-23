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
var timer;

io.sockets.on('connection', function(socket) {
	socket.on('newPlayer', function() {
		if(!game.player1.active || !game.player2.active) {
			addPlayer(socket);
		}
	})

	socket.on('keyPress', function(data) {
		opposites = {
			"up": "down",
			"left": "right",
			"down": "up",
			"right": "left"
		}

		keyData = JSON.parse(data);

		if(keyData.key === "r" && canReset()) {
			game.reset();
			reset();
			timer = setInterval(updateGame, 18);
		}
		else if(socket.player === 1) {
			if(opposites[keyData.key] != game.player1.direction)
				game.player1.direction = keyData.key;
		}
		else if(socket.player === 2) {
			if(opposites[keyData.key] != game.player2.direction)
				game.player2.direction = keyData.key;
		}
	});

	socket.on('disconnect', function(){
		game.active = false;
		if(socket.player === 1) { game.player1.active = false; clearInterval(timer); }
		else if(socket.player === 2) { game.player2.active = false; clearInterval(timer); }
	});

	gameOver = function(winningPlayer) {
		game.active = false;
		clearInterval(timer); 
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
});

function addPlayer(socket) {
	if(!game.player1.active) {
		game.player1.active = true;
		socket.player = 1;
	}
	else if(!game.player2.active) {
		game.player2.active = true;
		socket.player = 2;
	}
	if(game.player1.active && game.player2.active) {
		game.reset();
		reset();
		timer = setInterval(updateGame, 18);
	}
}

function canReset() {
	return game.player1.active 
		&& game.player2.active 
		&& !game.active;
}