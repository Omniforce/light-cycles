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
	game.resetGame();
	socket.on('keyPress', function(data) {
		keyData = JSON.parse(data);
		game.player1.direction = keyData.key;
	});

	socket.on('disconnect', function(){
		clearInterval(timer);
	});

	gameOver = function() {
		io.sockets.emit("gameOver")
	}

	updateGame = function() {
		game.tick();
		io.sockets.emit("updateGame", JSON.stringify(game.jsonifyGame()));
		if(game.isDead(game.player1)){ clearInterval(timer); gameOver(); }
	}

	timer = setInterval(updateGame, 18);
});