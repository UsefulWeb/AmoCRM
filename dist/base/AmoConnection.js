'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiUrls = require('../apiUrls.js');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmoConnection = function () {
  function AmoConnection(request) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AmoConnection);

    this._request = request;
    this._options = options;
    this._isConnected = false;

    this.setupAPIRequest();
  }

  _createClass(AmoConnection, [{
    key: 'setupAPIRequest',
    value: function setupAPIRequest() {
      var _options = this._options,
          login = _options.login,
          hash = _options.hash;

      if (!(login && hash)) {
        return;
      }
      this._request.setAPIParams('login=' + login + '&api_key=' + hash);
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }
      var _options2 = this._options,
          login = _options2.login,
          password = _options2.password,
          hash = _options2.hash,
          data = {
        USER_LOGIN: login
      };


      if (hash) {
        data['USER_HASH'] = hash;
      } else if (password) {
        data['USER_PASSWORD'] = password;
      }

      return this._request.post(_apiUrls2.default.auth, data, {
        headers: { 'Content-Type': 'application/json' },
        response: {
          dataType: 'json',
          saveCookies: true
        }
      }).then(function (data) {
        _this._isConnected = data.response.auth === true;
        return _this._isConnected;
      }).catch(function (e) {
        throw new Error('Connection Error: ' + e.message);
      });
    }
  }, {
    key: 'connected',
    get: function get() {
      return this._isConnected;
    }
  }]);

  return AmoConnection;
}();

module.exports = AmoConnection;