'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _EventResource2 = require('./../EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthServer = function (_EventResource) {
  _inherits(AuthServer, _EventResource);

  function AuthServer(options) {
    _classCallCheck(this, AuthServer);

    var _this = _possibleConstructorReturn(this, (AuthServer.__proto__ || Object.getPrototypeOf(AuthServer)).call(this));

    _this._options = options;
    return _this;
  }

  _createClass(AuthServer, [{
    key: 'run',
    value: function run() {
      var port = this._options.port,
          handler = this.handle.bind(this),
          onListenStart = this.onListenStart.bind(this);

      this._server = _http2.default.createServer(handler).listen(port, onListenStart);
    }
  }, {
    key: 'onListenStart',
    value: function onListenStart() {
      // const { port } = this._options;
      // console.log( `listening on port ${port}` );
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        return _this2._server.close().on('close', resolve).on('error', reject);
      });
    }
  }, {
    key: 'handle',
    value: function handle(request, response) {
      var _url$parse = _url2.default.parse(request.url, true),
          query = _url$parse.query,
          currentState = this._options.state,
          code = query.code,
          state = query.state;

      response.end();
      if (!code) {
        return;
      }
      if (currentState && state !== currentState) {
        return;
      }
      this.triggerEvent('code', {
        code: code,
        state: state
      });
    }
  }]);

  return AuthServer;
}(_EventResource3.default);

exports.default = AuthServer;