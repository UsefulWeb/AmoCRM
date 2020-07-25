'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('../routes/v4');

var _v2 = _interopRequireDefault(_v);

var _EventResource2 = require('./EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

var _helpers = require('../helpers');

var _PrivateDomainRequest = require('./requests/domain/PrivateDomainRequest');

var _PrivateDomainRequest2 = _interopRequireDefault(_PrivateDomainRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AmoConnection = function (_EventResource) {
  _inherits(AmoConnection, _EventResource);

  function AmoConnection() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AmoConnection);

    var _this = _possibleConstructorReturn(this, (AmoConnection.__proto__ || Object.getPrototypeOf(AmoConnection)).call(this));

    _this._request = new _PrivateDomainRequest2.default(options.domain);
    _this._options = options.auth;
    _this._isConnected = false;
    return _this;
  }

  _createClass(AmoConnection, [{
    key: 'disconnect',
    value: function disconnect() {
      this._request.clear();
      this._isConnected = false;

      this.triggerEvent('disconnected', true);
    }
  }, {
    key: 'connectIfNeeded',
    value: function connectIfNeeded() {

      if (!this._isConnected) {
        return this.connect();
      }

      this.triggerEvent('checkReconnect', true);

      var SESSION_LIFETIME = this.constructor.SESSION_LIFETIME,
          sessionExpiresAt = +this._lastRequestAt + SESSION_LIFETIME,
          now = new Date();


      if (now > sessionExpiresAt) {
        return this.reconnect();
      }

      if (this._request.expires && now > this._request.expires) {
        return this.reconnect();
      }

      return Promise.resolve();
    }
  }, {
    key: 'request',
    value: function request() {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.connectIfNeeded().then(function () {
        var _request;

        _this2._lastRequestAt = new Date();
        return (_request = _this2._request).request.apply(_request, args);
      });
    }
  }, {
    key: 'reconnect',
    value: function reconnect() {
      this._isConnected = false;
      this._request.clear();
      this.triggerEvent('beforeReconnect', true);
      return this.connect();
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this3 = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }
      var _options = this._options,
          client_id = _options.client_id,
          client_secret = _options.client_secret,
          redirect_uri = _options.redirect_uri,
          code = _options.code,
          data = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: code,
        grant_type: 'authorization_code'
      };


      this.triggerEvent('beforeConnect', this);
      // console.log({ data });
      this._lastConnectionRequestAt = new Date();
      return this._request.post(_v2.default.auth.token, data).then(function (response) {
        var _response$data = response.data,
            data = _response$data === undefined ? {} : _response$data;

        if (data && data.token_type) {
          _this3._isConnected = true;
        }

        if (_this3._isConnected) {
          var responseAt = response.info.headers.date;
          _this3._request.setToken(data, responseAt);
          _this3._lastRequestAt = new Date();
          _this3.triggerEvent('connected', _this3);
          return true;
        }

        var e = new Error('Auth Error');
        e.data = data;

        _this3.triggerEvent('authError', e, _this3);
        _this3.triggerEvent('error', e, _this3);

        return Promise.reject(e);
      });
    }
  }, {
    key: 'connected',
    get: function get() {
      return this._isConnected;
    }
  }]);

  return AmoConnection;
}(_EventResource3.default);

AmoConnection.EVENTS = ['beforeReconnect', 'beforeConnect', 'checkReconnect', 'authError', 'connected', 'disconnected', 'error'];
AmoConnection.SESSION_LIFETIME = 15 * 60 * 1000;

module.exports = AmoConnection;