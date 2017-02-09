module.exports = function(app, io) {
	var express = require('express');

	app.use(express.static(__dirname + '/public'));

	app.get('/', function(req, res) {
		res.sendfile(__dirname + '/public/index.html');
	});

	require('./socket.js')(io);
}