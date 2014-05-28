var socket = io.connect('http://mabosltrowel-m4:3000');
var gameOver = false;
var waitingTimer;

socket.on('connect', function() {
	socket.emit('newPlayer');
	initialize();
	drawSelectScreen(context);
});

socket.on('startGame', function(data) {
	var game = JSON.parse(data);

	drawBoard(context);
	drawPlayers(context, game);
	drawWalls(context,game);

	clearInterval(waitingTimer);
});

socket.on('updateGame', function(data) {
	var game = JSON.parse(data);

	drawBoard(context);
	drawPlayers(context, game);
	drawWalls(context,game);

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
