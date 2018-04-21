"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FindableById = function () {
  function FindableById() {
    _classCallCheck(this, FindableById);
  }

  _createClass(FindableById, [{
    key: "findById",
    value: function findById(id) {
      var _this = this;

      return this._resource.findById(id).then(function (response) {
        return _this.afterFindById(response);
      });
    }
  }, {
    key: "afterFindById",
    value: function afterFindById(response) {
      var attributes = response.getFirstItem();
      if (!attributes) {
        return;
      }
      return this.create(attributes);
    }
  }]);

  return FindableById;
}();

exports.default = FindableById;