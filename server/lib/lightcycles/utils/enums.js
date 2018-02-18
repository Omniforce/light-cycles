'use strict';

var _enum = require('enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameStates = new _enum2.default(['menu', 'waiting', 'intro', 'playing', 'completed']);
var directions = new _enum2.default(['up', 'down', 'left', 'right']);

module.exports = {
  gameStates: gameStates,
  directions: directions
};