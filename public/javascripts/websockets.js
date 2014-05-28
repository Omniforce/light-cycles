var socket = io.connect('http://mabosbross-m2:3000');
var gameOver = false;
var waitingTimer;

socket.on('connect', function() {
	socket.emit('newPlayer');
	initialize();
	drawSelectScreen(context);
});

socket.on('startGame', function(event) {
	drawBoard(context);
	clearInterval(waitingTimer);
});

socket.on('updateGame', function(data) {
	var game = JSON.parse(data);

	drawPlayer(context, game.player1.x, game.player1.y, game.player1.color);
	drawPlayer(context, game.player2.x, game.player2.y, game.player2.color);

	if(game.playerCount >= 3) {
		drawPlayer(context, game.player3.x, game.player3.y, game.player3.color);
	}
	if(game.playerCount >= 4) {
		drawPlayer(context, game.player4.x, game.player4.y, game.player4.color);
	}
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
});

socket.on('waiting',function(){
	waitingTimer = setInterval(function() { drawWaiting(context) }, 1000);
});
