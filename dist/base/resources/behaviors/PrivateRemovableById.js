'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrivateRemovableById = function () {
  function PrivateRemovableById() {
    _classCallCheck(this, PrivateRemovableById);
  }

  _createClass(PrivateRemovableById, [{
    key: 'removeById',
    value: function removeById(id) {
      var deletePath = this.constructor.deletePath;

      if (!deletePath) {
        throw new Error('deletePath is not specified!');
      }
      return this.request('POST', deletePath, {
        ID: id,
        ACTION: 'DELETE',
        pipeline: 'Y'
      }, {
        formData: true
      });
    }
  }]);

  return PrivateRemovableById;
}();

exports.default = PrivateRemovableById;