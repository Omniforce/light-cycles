var socket = io.connect('http://localhost:3000');
var gameOver = false;

socket.on('connect', function() {
	socket.emit('newPlayer');
	initialize();
	drawSelectScreen(context);
});

socket.on('updateGame', function(data) {
	players = JSON.parse(data);
	drawPlayer(context, players.player1.x, players.player1.y, players.player1.color);
	drawPlayer(context, players.player2.x, players.player2.y, players.player2.color);
});

socket.on('gameOver', function(data) {
	drawGameOver(context, data);
	gameOver = false;
});

socket.on('reset', function() {
	drawBoard(context);
});

socket.on('updatePointer', function(data) {
	selection = JSON.parse(data).selection;
	drawPointer(context, selection);
})

socket.on('waiting',function(){
	drawWaiting1(context);
	drawWaiting2(context);
	drawWaiting3(context);
})
