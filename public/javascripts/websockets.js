var socket = io.connect('http://mabosbross-m2:3000');
var gameOver = false;
var waitingTimer;

socket.on('connect', function() {
	socket.emit('newPlayer');
	initialize();
	drawSelectScreen(context);
});

socket.on('startGame', function(data) {
	clearInterval(waitingTimer);

	var game = JSON.parse(data);
	drawBoard(context);
	drawPlayers(context, game);

	clearInterval(waitingTimer);
});

socket.on('updateGame', function(data) {
	var game = JSON.parse(data);

	drawPlayers(context, game);
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

socket.on("death", function(data) {
	var walls = data;
	drawBoard(context);
	drawWalls(context, walls);
});
