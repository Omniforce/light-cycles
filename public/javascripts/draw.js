var canvas;
var context;
var width = 600;
var height = 600;
var cellSize = 5;

function drawBoard(ctx) {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height);
}

function drawPlayer(ctx, gridx, gridy, color) {
	var x = gridx * cellSize;
	var y = gridy * cellSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);
}

function drawGameOver(ctx, winningPlayer) {
	ctx.font = '50pt Gothic';
    ctx.fillStyle = 'white';
    ctx.fillText("GAME OVER", 105, 250);

    ctx.font = '30pt Gothic';
    ctx.fillText(winningPlayer + " wins!", 190, 300);

    ctx.font = '15pt Gothic';
    ctx.fillText("Press r to restart", 235, 330);
}

function initialize() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBoard(context);
}