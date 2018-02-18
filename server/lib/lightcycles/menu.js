"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.selection = 2;
  }

  _createClass(Menu, [{
    key: "getSelection",
    value: function getSelection() {
      return this.selection;
    }
  }, {
    key: "updateSelection",
    value: function updateSelection(key) {
      if (key == 38) {
        this.moveUp();
      } else if (key = 40) {
        this.moveDown();
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.selection = Math.max(this.selection - 1, 2);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.selection = Math.min(this.selection + 1, 4);
    }
  }]);

  return Menu;
}();

exports.default = Menu;