'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPSRequest = function () {
  function HTTPSRequest(options) {
    _classCallCheck(this, HTTPSRequest);

    this._options = options;
  }

  _createClass(HTTPSRequest, [{
    key: 'send',
    value: function send() {
      var _this = this;

      var _options = this._options,
          hostname = _options.hostname,
          path = _options.path,
          _options$method = _options.method,
          method = _options$method === undefined ? 'GET' : _options$method,
          _options$headers = _options.headers,
          headers = _options$headers === undefined ? {} : _options$headers,
          _options$data = _options.data,
          data = _options$data === undefined ? '' : _options$data;

      return new Promise(function (resolve, reject) {
        var request = _https2.default.request({
          hostname: hostname,
          path: path,
          method: method,
          headers: headers
        }, _this.onResponse(resolve, reject));

        if (method !== 'GET') {
          request.write(data);
        }
        request.on('error', _this.onError(reject));
        request.end();
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
  }, {
    key: 'onResponse',
    value: function onResponse(callback) {
      var rawData = '';
      var onResponseData = function onResponseData(chunk) {
        return rawData += chunk;
      },
          onRequestEnd = function onRequestEnd(response) {
        return function () {
          return callback({ response: response, rawData: rawData });
        };
      };

      return function (response) {
        response.on('data', onResponseData);
        response.on('end', onRequestEnd(response));
      };
    }
  }]);

  return HTTPSRequest;
}();

exports.default = HTTPSRequest;