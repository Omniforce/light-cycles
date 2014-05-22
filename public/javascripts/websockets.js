var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	initialize();
});

socket.on('updateGame', function(data) {
	player = JSON.parse(data);
	drawPlayer(context, player.x, player.y, player.color);
});

socket.on('gameOver', function() {
	drawGameOver(context);
});
