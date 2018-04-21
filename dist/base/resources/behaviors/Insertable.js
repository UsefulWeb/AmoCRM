'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Insertable = function () {
  function Insertable() {
    _classCallCheck(this, Insertable);
  }

  _createClass(Insertable, [{
    key: 'insert',
    value: function insert() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _constructor = this.constructor,
          insertPath = _constructor.insertPath,
          path = _constructor.path;

      return this.request('POST', insertPath || path, {
        add: data
      });
    }
  }]);

  return Insertable;
}();

exports.default = Insertable;