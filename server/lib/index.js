'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(1338);

require('./lightcycles')(app, io);