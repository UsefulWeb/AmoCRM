"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityHandler = function () {
  /**
   * @param entity {EntityActiveRecord}
   */
  function EntityHandler(entity) {
    _classCallCheck(this, EntityHandler);

    this._entity = entity;
  }

  _createClass(EntityHandler, [{
    key: "get",
    value: function get(target, name) {
      if (this._entity[name]) {
        return this._entity[name];
      }
      if (this._entity.hasAttribute(name)) {
        return this._entity.getAttribute(name);
      }
    }
  }, {
    key: "set",
    value: function set(target, name, value) {
      if (this._entity[name]) {
        this._entity[name] = value;
        return true;
      }
      var result = this._entity.setAttribute(name, value);
      return Boolean(result);
    }
  }]);

  return EntityHandler;
}();

exports.default = EntityHandler;