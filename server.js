var express = require('express'),
	http = require('http'),
	app = express(),
	path = require('path');

var server = http.createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});