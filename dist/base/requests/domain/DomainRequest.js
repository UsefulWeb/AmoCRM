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

var _EventResource2 = require('../../EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomainRequest = function (_EventResource) {
  _inherits(DomainRequest, _EventResource);

  function DomainRequest(domain) {
    _classCallCheck(this, DomainRequest);

    if (!domain) {
      throw new Error('Portal domain must be set!');
    }

    var _this = _possibleConstructorReturn(this, (DomainRequest.__proto__ || Object.getPrototypeOf(DomainRequest)).call(this));

    _this._queue = new _promiseQueue2.default(1);
    _this._cookies = [];
    _this._hostname = domain.includes('.') ? domain : domain + '.amocrm.ru';
    return _this;
  }

  _createClass(DomainRequest, [{
    key: 'clear',
    value: function clear() {
      this._cookies = [];
    }
  }, {
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
      var _this2 = this;

      return this._queue.add(function () {
        return request.send().then(function (response) {
          return _this2.handleResponse(response, options);
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
    value: function getDefaultHeaders(options) {
      var withToken = options.withToken !== false,
          isJSON = options.json !== false,
          headers = {};

      if (withToken && this._token) {
        headers['Authorization'] = 'Bearer ' + this._token.access_token;
      } else if (!withToken) {
        headers['Cookie'] = this._cookies.join();
      }
      if (isJSON && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }

      return Object.assign({}, options.headers, headers);
    }
  }, {
    key: 'getRequestHeaders',
    value: function getRequestHeaders(url) {
      var encodedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var isGET = method === 'GET',
          headers = this.getDefaultHeaders(options);

      if (!isGET && encodedData) {
        headers['Content-Length'] = Buffer.byteLength(encodedData);
      }
      return headers;
    }

    /**
     * @param {Object} token
     */

  }, {
    key: 'setToken',
    value: function setToken(token) {
      this._token = token;
      if (!token) {
        delete this._expires;
        return;
      }
      if (!token.expires_at) {
        var now = new Date();
        this._expires = now;
        return;
      }

      this._expires = new Date(token.expires_at);
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return this._token;
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(_ref) {
      var rawData = _ref.rawData,
          response = _ref.response;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var responseHandlerClass = this.constructor.responseHandlerClass;

      var handler = new responseHandlerClass(rawData, response);
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
  }, {
    key: 'expires',
    get: function get() {
      return this._expires;
    }
  }]);

  return DomainRequest;
}(_EventResource3.default);

DomainRequest.responseHandlerClass = _DomainResponseHandler2.default;
DomainRequest.DEFAULT_USER_AGENT = 'amoCRM-API-client/1.0';
exports.default = DomainRequest;