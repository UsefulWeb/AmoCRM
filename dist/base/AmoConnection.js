'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _v = require('../routes/v4');

var _v2 = _interopRequireDefault(_v);

var _EventResource2 = require('./EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

var _helpers = require('../helpers');

var _PrivateDomainRequest = require('./requests/domain/PrivateDomainRequest');

var _PrivateDomainRequest2 = _interopRequireDefault(_PrivateDomainRequest);

var _AuthServer = require('./auth/AuthServer');

var _AuthServer2 = _interopRequireDefault(_AuthServer);

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
    _this._code = _this._options.code;
    return _this;
  }

  _createClass(AmoConnection, [{
    key: 'connectIfNeeded',
    value: function connectIfNeeded() {
      if (!this._isConnected) {
        return this.connect();
      }

      this.triggerEvent('checkToken', true);

      if (this.isRequestExpired()) {
        return this.refreshToken();
      }

      return Promise.resolve();
    }
  }, {
    key: 'isRequestExpired',
    value: function isRequestExpired() {
      if (!this.getToken()) {
        return false;
      }
      var now = new Date();
      return this._request.expires && now > this._request.expires;
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
    value: function setToken(token) {
      this._request.setToken(token);
      this._isConnected = !this.isRequestExpired();
      return this;
    }
  }, {
    key: 'setCode',
    value: function setCode(code) {
      this._code = code;
      return this.connect();
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this._state = state;
      return this;
    }
  }, {
    key: 'getState',
    value: function getState(state) {
      return this._state;
    }
  }, {
    key: 'getAuthUrl',
    value: function getAuthUrl() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'popup';
      var baseUrl = 'https://www.amocrm.ru/oauth',
          client_id = this._options.client_id,
          params = {
        client_id: client_id,
        mode: mode
      },
          state = this.getState();

      if (state) {
        params.state = state;
      }
      var paramsStr = _qs2.default.stringify(params),
          url = baseUrl + '?' + paramsStr;
      return url;
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return this._request.getToken();
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
          data = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: this._code,
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
      var _options2 = this._options,
          client_id = _options2.client_id,
          client_secret = _options2.client_secret,
          redirect_uri = _options2.redirect_uri,
          token = this.getToken();

      if (!token) {
        console.log('no token');
        return Promise.reject('no token');
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
      var token = response.data;
      if (!token.token_type) {
        return;
      }

      if (!token.expires_at) {
        var headers = response.info.headers,
            responseAt = new Date(headers.date),
            responseTimestamp = responseAt.getTime(),
            expiresIn = token.expires_in * 1000;


        token.expires_at = responseTimestamp + expiresIn;
      }

      var event = _extends({}, response, {
        data: token
      });
      this.triggerEvent('newToken', event);
      this.setToken(token);
    }
  }, {
    key: 'waitUserAction',
    value: function waitUserAction() {
      var _this5 = this;

      if (this._server) {
        return Promise.resolve();
      }
      var options = _extends({}, this._options.server, {
        state: this.getState()
      }),
          server = new _AuthServer2.default(options);

      this._server = server;
      var handleCode = new Promise(function (resolve) {
        server.on('code', function (event) {
          var code = event.code;

          resolve(code);
        });
        server.run();
      });

      return handleCode.then(function (code) {
        server.stop();
        return code;
      }).then(function (code) {
        _this5._server = null;
        return _this5.setCode(code);
      });
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this6 = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }

      this.triggerEvent('beforeConnect', this);
      this._lastConnectionRequestAt = new Date();

      if (!this._code && this._options.server) {
        return this.waitUserAction();
      } else if (this.getToken() && this.isRequestExpired()) {
        return this.refreshToken();
      } else if (!this._code && !this.getToken()) {
        return Promise.resolve(false);
      }

      return this.fetchToken().then(function (response) {
        var _response$data = response.data,
            data = _response$data === undefined ? {} : _response$data;

        if (data && data.token_type) {
          _this6._lastRequestAt = new Date();
          _this6.triggerEvent('connected', _this6);
          _this6._isConnected = true;
          return Promise.resolve(true);
        }

        var e = new Error('Auth Error');
        e.data = data;

        _this6.triggerEvent('authError', e, _this6);
        _this6.triggerEvent('error', e, _this6);

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

AmoConnection.EVENTS = ['beforeConnect', 'beforeFetchToken', 'beforeRefreshToken', 'newToken', 'checkToken', 'authError', 'connected', 'error'];

module.exports = AmoConnection;