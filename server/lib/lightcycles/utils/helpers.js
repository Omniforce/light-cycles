'use strict';

var _enums = require('./enums');

var keyToDirection = {
  37: _enums.directions.left,
  38: _enums.directions.up,
  39: _enums.directions.right,
  40: _enums.directions.down
};

var startingPlayerStates = [{ x: 10, y: 60, direction: _enums.directions.right }, { x: 110, y: 60, direction: _enums.directions.left }, { x: 60, y: 10, direction: _enums.directions.down }, { x: 60, y: 110, direction: _enums.directions.up }];

module.exports = {
  keyToDirection: keyToDirection,
  startingPlayerStates: startingPlayerStates
};