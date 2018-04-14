'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiUrls = require('../../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasMultiactions = function () {
  function HasMultiactions() {
    _classCallCheck(this, HasMultiactions);
  }

  _createClass(HasMultiactions, [{
    key: 'multiactions',
    value: function multiactions(ids) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var multiaction_type = arguments[2];
      var _constructor = this.constructor,
          ENTITY_TYPE = _constructor.ENTITY_TYPE,
          multiactionsPath = _constructor.multiactionsPath,
          path = multiactionsPath || _apiUrls2.default.multiactions;


      return this.request('POST', path, {
        request: {
          multiactions: {
            add: [{
              entity_type: ENTITY_TYPE,
              multiaction_type: multiaction_type,
              data: data,
              ids: ids
            }]
          }
        }
      }, {
        formData: true
      });
    }
  }]);

  return HasMultiactions;
}();

exports.default = HasMultiactions;