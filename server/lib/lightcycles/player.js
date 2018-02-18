'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moniker = require('moniker');

var _moniker2 = _interopRequireDefault(_moniker);

var _randomColor = require('random-color');

var _randomColor2 = _interopRequireDefault(_randomColor);

var _enums = require('./utils/enums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.uuid = (0, _v2.default)();
    this.name = _moniker2.default.choose();
    this.color = (0, _randomColor2.default)(0.99, 0.99).hexString();

    this.ready = false;
    this.alive = false;
  }

  _createClass(Player, [{
    key: 'isReady',
    value: function isReady() {
      return this.ready;
    }
  }, {
    key: 'isAlive',
    value: function isAlive() {
      return this.alive;
    }
  }, {
    key: 'reset',
    value: function reset(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.previousDirection = direction;
      this.alive = true;
    }
  }, {
    key: 'move',
    value: function move(walls) {
      walls.push({ playerId: this.uuid, x: this.x, y: this.y, color: this.color });
      this.previousDirection = this.direction;

      switch (this.direction) {
        case _enums.directions.up:
          this.y -= 1;
          break;
        case _enums.directions.left:
          this.x -= 1;
          break;
        case _enums.directions.down:
          this.y += 1;
          break;
        default:
          // right
          this.x += 1;
          break;
      }
    }
  }, {
    key: 'isTouchingPlayer',
    value: function isTouchingPlayer(player) {
      return this.x == player.x && this.y == player.y;
    }
  }, {
    key: 'hasHitWall',
    value: function hasHitWall(walls) {
      var _this = this;

      return walls.reduce(function (acc, segment) {
        return acc || _this.x == segment.x && _this.y == segment.y;
      }, false);
    }
  }, {
    key: 'hasLeftBoundries',
    value: function hasLeftBoundries(boundX, boundY) {
      return this.x < 0 || this.x >= boundX || this.y < 0 || this.y >= boundY;
    }
  }]);

  return Player;
}();

exports.default = Player;