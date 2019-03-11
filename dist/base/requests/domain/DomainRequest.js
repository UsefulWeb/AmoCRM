'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promiseQueue = require('promise-queue');

var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _HTTPRequest = require('../common/HTTPRequest');

var _HTTPRequest2 = _interopRequireDefault(_HTTPRequest);

var _DomainResponseHandler = require('../../responseHandlers/DomainResponseHandler');

var _DomainResponseHandler2 = _interopRequireDefault(_DomainResponseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainRequest = function () {
  function DomainRequest(domain) {
    _classCallCheck(this, DomainRequest);

    if (!domain) {
      throw new Error('Portal domain must be set!');
    }
    this._queue = new _promiseQueue2.default(1);
    this._cookies = [];
    this._hostname = domain.includes('.') ? domain : domain + '.amocrm.com';
  }

  _createClass(DomainRequest, [{
    key: 'post',
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.request(url, data, 'POST', options);
    }
  }, {
    key: 'get',
    value: function get(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.request(url, data, 'GET', options);
    }
  }, {
    key: 'request',
    value: function request(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var encodedData = this.encodeData(url, data, method, options),
          headers = this.getRequestHeaders(url, encodedData, method, options),
          request = this.createRequest(url, encodedData, method, headers);
      return this.addRequestToQueue(request, options.response);
    }
  }, {
    key: 'addRequestToQueue',
    value: function addRequestToQueue(request, options) {
      var _this = this;

      return this._queue.add(function () {
        return request.send().then(function (response) {
          return _this.handleResponse(response, options);
        });
      });
    }
  }, {
    key: 'encodeData',
    value: function encodeData(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var isGET = method === 'GET';

      return isGET ? _qs2.default.stringify(data) : JSON.stringify(data);
    }
  }, {
    key: 'getDefaultHeaders',
    value: function getDefaultHeaders(headers) {
      return Object.assign({}, headers, {
        'Cookie': this._cookies.join(),
        'User-Agent': this.constructor.DEFAULT_USER_AGENT
      });
    }
  }, {
    key: 'getRequestHeaders',
    value: function getRequestHeaders(url) {
      var encodedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var isGET = method === 'GET',
          headers = this.getDefaultHeaders(options.headers);

      if (!isGET && encodedData) {
        headers['Content-Length'] = Buffer.byteLength(encodedData);
      }
      return headers;
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(_ref) {
      var rawData = _ref.rawData,
          response = _ref.response;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var responseHandlerClass = this.constructor.responseHandlerClass;

      if (options.saveCookies) {
        this._cookies = response.headers['set-cookie'];
      }
      var handler = new responseHandlerClass(rawData);
      return handler.toJSON(options);
    }
  }, {
    key: 'createRequest',
    value: function createRequest(url) {
      var encodedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var isGET = method === 'GET',
          path = isGET ? url + '?' + encodedData : url;

      return new _HTTPRequest2.default({
        path: path,
        hostname: this._hostname,
        headers: headers,
        method: method,
        data: encodedData,
        secure: true
      });
    }
  }]);

  return DomainRequest;
}();

DomainRequest.responseHandlerClass = _DomainResponseHandler2.default;
DomainRequest.DEFAULT_USER_AGENT = 'amoCRM-API-client/1.0';
exports.default = DomainRequest;