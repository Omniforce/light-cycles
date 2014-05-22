var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	initialize();
});

socket.on('updateGame', function(data) {
	players = JSON.parse(data);
	drawPlayer(context, players.player1.x, players.player1.y, players.player1.color);
	drawPlayer(context, players.player2.x, players.player2.y, players.player2.color);
});

socket.on('gameOver', function() {
	drawGameOver(context);
});
