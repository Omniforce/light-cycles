var socket = io.connect('http://mabosltrowel-m4:3000');

socket.on('connect', function() {
	initialize();
});

socket.on('updateGame', function(data) {
	player = JSON.parse(data);
	drawPlayer(context, player.x, player.y, player.color);
});
