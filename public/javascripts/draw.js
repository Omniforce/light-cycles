var canvas;
var context;
var width = 600;
var height = 600;
var cellSize = 5;
var dots = "."

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

function drawSelectScreen(ctx) {
	ctx.font = '50pt Gothic';
	ctx.fillStyle = '#18CAE6';
	ctx.fillText("TRON", 200, 250)

	ctx.font = '30 Gothic';
	ctx.fillStyle = 'white';
	ctx.fillText('Select Number of Players', 140, 300);

	ctx.font = '15pt Gotchic';
	ctx.fillText('2 players', 260, 340);
	ctx.fillText('3 players', 260, 370);
	ctx.fillText('4 players', 260, 400);
}

function drawPointer(ctx, selection) {
	drawBoard(ctx);
	drawSelectScreen(ctx);

	y = 280 + (selection * 30);
	ctx.beginPath();
    ctx.moveTo(240, y-5);
    ctx.lineTo(230, y-15);
    ctx.lineTo(230, y+5);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function initialize() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBoard(context);
}

function drawWaiting(ctx){
	drawBoard(ctx);
	ctx.font = '30 Gothic'
	ctx.fillStyle = 'white';
	ctx.fillText('Waiting for players' + dots, 180, 300);

	if(dots.length >= 3) { dots = "."; }
	else { dots += "."; }
}
// function drawWaiting2(ctx){
// 	ctx.fillText('.', 450, 340);
// }
// function drawWaiting3(ctx){
// 	ctx.fillText('.', 460, 340);
// }
