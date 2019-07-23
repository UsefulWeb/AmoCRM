"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Findable = function () {
  function Findable() {
    _classCallCheck(this, Findable);
  }

  _createClass(Findable, [{
    key: "find",
    value: function find(query) {
      var _this = this;

      return this._resource.find(query).then(function (response) {
        return _this.afterFind(response);
      });
    }
  }, {
    key: "findOne",
    value: function findOne(query) {
      var _this2 = this;

      var criteria = Object.assign({}, query, {
        limit_rows: 1
      });
      return this._resource.find(criteria).then(function (response) {
        return _this2.afterFindOne(response);
      });
    }
  }, {
    key: "afterFindOne",
    value: function afterFindOne(response) {
      var attributes = response.getFirstItem();
      if (!attributes) {
        return;
      }
      return this.create(attributes);
    }
  }, {
    key: "afterFind",
    value: function afterFind(response) {
      var items = response.getItems();
      return this.from(items);
    }
  }]);

  return Findable;
}();

exports.default = Findable;