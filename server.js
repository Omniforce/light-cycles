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

io.sockets.on('connection', function(socket) {
	updateGame = function() {
		game.tick();
		io.sockets.emit("updateGame", JSON.stringify(game.jsonifyGame()));
	}

	setInterval(updateGame, 16);
});