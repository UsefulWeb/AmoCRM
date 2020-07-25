'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    _this._options = _extends({}, options.auth);
    _this._isConnected = false;
    return _this;
  }

  _createClass(AmoConnection, [{
    key: 'connectIfNeeded',
    value: function connectIfNeeded() {

      if (!this._isConnected) {
        return this.connect();
      }

      this.triggerEvent('checkToken', true);

      var now = new Date();

      if (this._request.expires && now > this._request.expires) {
        return this.refreshToken();
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
    key: 'setToken',
    value: function setToken(token, tokenHandledAt) {
      this._request.setToken(token, tokenHandledAt);
      return this;
    }
  }, {
    key: 'setCode',
    value: function setCode(code) {
      this._options.code = code;
      return this.connect();
    }
  }, {
    key: 'fetchToken',
    value: function fetchToken() {
      var _this3 = this;

      this.triggerEvent('beforeFetchToken', this);
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


      return this._request.post(_v2.default.auth.token, data).then(function (response) {
        _this3.handleToken(response);
        return response;
      });
    }
  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      var _this4 = this;

      this.triggerEvent('beforeRefreshToken', this);
      console.log('refreshing token');

      var _options2 = this._options,
          client_id = _options2.client_id,
          client_secret = _options2.client_secret,
          redirect_uri = _options2.redirect_uri,
          token = this._request.getToken();

      if (!token) {
        console.log('no token');
        return;
      }
      var refresh_token = token.refresh_token,
          data = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      };


      return this._request.post(_v2.default.auth.token, data).then(function (response) {
        _this4.handleToken(response);
        return response;
      });
    }
  }, {
    key: 'handleToken',
    value: function handleToken(response) {
      if (!response.data.token_type) {
        return;
      }
      var responseAt = response.info.headers.date;
      this.setToken(response.data, responseAt);
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this5 = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }

      this.triggerEvent('beforeConnect', this);
      this._lastConnectionRequestAt = new Date();
      var requestPromise = this._isConnected ? this.refreshToken() : this.fetchToken();

      return requestPromise.then(function (response) {
        var _response$data = response.data,
            data = _response$data === undefined ? {} : _response$data;

        if (data && data.token_type) {
          _this5._lastRequestAt = new Date();
          _this5.triggerEvent('connected', _this5);
          return true;
        }

        var e = new Error('Auth Error');
        e.data = data;

        _this5.triggerEvent('authError', e, _this5);
        _this5.triggerEvent('error', e, _this5);

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

AmoConnection.EVENTS = ['beforeConnect', 'beforeFetchToken', 'beforeRefreshToken', 'checkToken', 'authError', 'connected', 'error'];

module.exports = AmoConnection;