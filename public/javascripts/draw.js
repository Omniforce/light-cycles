var canvas;
var context;

function drawBoard(ctx) {
	ctx.rect(0, 0, 600, 400);
	ctx.fillStyle = "#000000";
	ctx.fill();
}

function initialize() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBoard(context);
}