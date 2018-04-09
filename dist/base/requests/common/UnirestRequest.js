'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnirestRequest = function () {
  function UnirestRequest(options) {
    _classCallCheck(this, UnirestRequest);

    this._options = options;
  }

  _createClass(UnirestRequest, [{
    key: 'send',
    value: function send() {
      var _this = this;

      var _options = this._options,
          url = _options.url,
          _options$method = _options.method,
          method = _options$method === undefined ? 'GET' : _options$method,
          _options$headers = _options.headers,
          headers = _options$headers === undefined ? {} : _options$headers,
          _options$data = _options.data,
          data = _options$data === undefined ? {} : _options$data;

      return new Promise(function (resolve, reject) {
        var request = (0, _unirest2.default)(method, url);
        request.headers(headers);
        request.form(data);

        request.end(function (response) {
          if (response.error) {
            return _this.onError(reject)(response);
          }
          resolve({
            rawData: response.raw_body,
            response: response
          });
        });
      });
    }
  }, {
    key: 'onError',
    value: function onError(callback) {
      return function (_ref) {
        var error = _ref.error;
        return callback(error);
      };
    }
  }]);

  return UnirestRequest;
}();

exports.default = UnirestRequest;