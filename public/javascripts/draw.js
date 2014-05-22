var canvas;
var context;
var width = 600;
var height = 400;
var cellSize = 5;

function drawBoard(ctx) {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 600, 400);
	console.log("DRAWING BOARD");
}

function drawPlayer(ctx, gridx, gridy, color) {
	var x = gridx * cellSize;
	var y = gridy * cellSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);
}

function initialize() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBoard(context);
}