'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiUrls = require('../apiUrls.js');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EventResource2 = require('./EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AmoConnection = function (_EventResource) {
  _inherits(AmoConnection, _EventResource);

  function AmoConnection(request) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AmoConnection);

    var _this = _possibleConstructorReturn(this, (AmoConnection.__proto__ || Object.getPrototypeOf(AmoConnection)).call(this));

    _this._request = request;
    _this._options = options;
    _this._isConnected = false;
    _this._reconnectOptions = Object.assign({ disabled: false }, options.reconnection);
    return _this;
  }

  _createClass(AmoConnection, [{
    key: 'reconnectAt',
    value: function reconnectAt(date) {
      var _this2 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60 * 1000;
      var accuracyTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60 * 1000;

      delete this._reconnectTimeout;

      var timeout = void 0;
      var self = this,
          onReconnect = new Promise(function check(resolve, reject) {
        if (self._reconnectTimeout !== timeout) {
          return reject();
        }
        timeout = setTimeout(function () {
          var now = new Date();

          if (now > date - accuracyTime) {
            return resolve();
          }

          check(resolve, reject);
          self.triggerEvent('checkReconnect', true);
        }, delay);

        self._reconnectTimeout = timeout;
      });

      return onReconnect.then(function () {
        _this2.triggerEvent('beforeReconnect', true);
        return _this2.connect();
      });
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      if (this._reconnectTimeout) {
        clearTimeout(this._reconnectTimeout);
        this.triggerEvent('disconnected', true);
      }
      delete this._reconnectTimeout;
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this3 = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }
      var _options = this._options,
          login = _options.login,
          password = _options.password,
          hash = _options.hash,
          reconnection = this._reconnectOptions,
          checkDelay = reconnection.checkDelay,
          accuracyTime = reconnection.accuracyTime,
          data = {
        USER_LOGIN: login
      };


      if (hash) {
        data['USER_HASH'] = hash;
      } else if (password) {
        data['USER_PASSWORD'] = password;
      }

      this.triggerEvent('beforeConnect', this);

      return this._request.post(_apiUrls2.default.auth, data, {
        headers: { 'Content-Type': 'application/json' },
        response: {
          dataType: 'json',
          saveCookies: true
        }
      }).then(function (data) {
        if (!reconnection.disabled) {
          _this3.reconnectAt(_this3._request.expires, checkDelay, accuracyTime);
        }

        if (data && data.response && data.response.auth) {
          _this3._isConnected = data.response.auth === true;
        }

        if (_this3._isConnected) {
          _this3.triggerEvent('connected', _this3);
          return true;
        }

        var e = new Error('Auth Error');
        e.data = data.response;

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

module.exports = AmoConnection;