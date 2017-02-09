var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logger = require('morgan');

server.listen(3000);

app.use(logger('dev'));

require('./lightcycles/app.js')(app, io);