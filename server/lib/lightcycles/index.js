'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socketsController = require('./socketsController');

var _socketsController2 = _interopRequireDefault(_socketsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, io) {
  var countdownSpeed = 1000;
  var tickSpeed = 25;

  var sockets = new _socketsController2.default(io, countdownSpeed, tickSpeed);
  sockets.setup();
};