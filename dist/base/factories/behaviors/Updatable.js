"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Updatable = function () {
  function Updatable() {
    _classCallCheck(this, Updatable);
  }

  _createClass(Updatable, [{
    key: "update",
    value: function update(rawData) {
      var data = this.getDataAttributes(rawData);
      return this._resource.update(data);
    }
  }]);

  return Updatable;
}();

exports.default = Updatable;