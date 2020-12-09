'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _DomainRequest2 = require('./DomainRequest');

var _DomainRequest3 = _interopRequireDefault(_DomainRequest2);

var _HTTPRequest = require('../common/HTTPRequest');

var _HTTPRequest2 = _interopRequireDefault(_HTTPRequest);

var _PrivateDomainResponseHandler = require('../../responseHandlers/PrivateDomainResponseHandler');

var _PrivateDomainResponseHandler2 = _interopRequireDefault(_PrivateDomainResponseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivateDomainRequest = function (_DomainRequest) {
  _inherits(PrivateDomainRequest, _DomainRequest);

  function PrivateDomainRequest() {
    _classCallCheck(this, PrivateDomainRequest);

    return _possibleConstructorReturn(this, (PrivateDomainRequest.__proto__ || Object.getPrototypeOf(PrivateDomainRequest)).apply(this, arguments));
  }

  _createClass(PrivateDomainRequest, [{
    key: 'request',
    value: function request(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (options.formData) {
        return this.requestWithFormData(url, data, method, options);
      }
      return _get(PrivateDomainRequest.prototype.__proto__ || Object.getPrototypeOf(PrivateDomainRequest.prototype), 'request', this).call(this, url, data, method, options);
    }
  }, {
    key: 'requestWithFormData',
    value: function requestWithFormData(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var headers = _extends({}, this.getDefaultHeaders(options), {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      var encodedData = _qs2.default.stringify(data),
          request = this.createFormRequest(url, encodedData, method, headers);
      return this.addRequestToQueue(request, options.response);
    }
  }, {
    key: 'createFormRequest',
    value: function createFormRequest(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var isGET = method === 'GET',
          protocol = this.constructor.NETWORK_PROTOCOL,
          secure = protocol === 'https',
          path = isGET ? url + '?' + this.encodeData(data) : url,
          hostname = this._hostname;

      return new _HTTPRequest2.default({
        hostname: hostname,
        path: path,
        data: data,
        method: method,
        headers: headers,
        secure: secure
      });
    }
  }]);

  return PrivateDomainRequest;
}(_DomainRequest3.default);

PrivateDomainRequest.responseHandlerClass = _PrivateDomainResponseHandler2.default;
PrivateDomainRequest.NETWORK_PROTOCOL = 'https';
exports.default = PrivateDomainRequest;