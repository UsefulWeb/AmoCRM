'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventResource2 = require('./base/EventResource');

var _EventResource3 = _interopRequireDefault(_EventResource2);

var _AmoConnection = require('./base/AmoConnection');

var _AmoConnection2 = _interopRequireDefault(_AmoConnection);

var _ResourceFactoryBuilder = require('./base/ResourceFactoryBuilder');

var _ResourceFactoryBuilder2 = _interopRequireDefault(_ResourceFactoryBuilder);

var _ConnectionRequest = require('./base/requests/ConnectionRequest');

var _ConnectionRequest2 = _interopRequireDefault(_ConnectionRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AmoCRM = function (_EventResource) {
  _inherits(AmoCRM, _EventResource);

  function AmoCRM(options) {
    _classCallCheck(this, AmoCRM);

    var _this = _possibleConstructorReturn(this, (AmoCRM.__proto__ || Object.getPrototypeOf(AmoCRM)).call(this));

    if (!options) {
      throw new Error('Wrong configuration');
    }

    options = Object.assign({
      auth: {}
    }, options);

    _this._options = options;
    _this._connection = new _AmoConnection2.default(options);

    _this.request = new _ConnectionRequest2.default(_this._connection);
    _this.registerEvents();
    _this.assignFactories();
    return _this;
  }

  _createClass(AmoCRM, [{
    key: 'registerEvents',
    value: function registerEvents() {
      var _this2 = this;

      this.proxyEventHandlers('connection', _AmoConnection2.default.EVENTS, this._connection);
      this._connection.on('error', function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this2.triggerEvent.apply(_this2, ['error'].concat(args));
      });
    }
  }, {
    key: 'assignFactories',
    value: function assignFactories() {
      var builder = new _ResourceFactoryBuilder2.default(this._connection),
          factories = builder.getResourceFactories();
      Object.assign(this, factories);
    }
  }, {
    key: 'connect',
    value: function connect() {
      return this._connection.connect();
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      return this._connection.disconnect();
    }
  }, {
    key: 'connection',
    get: function get() {
      return this._connection;
    }
  }]);

  return AmoCRM;
}(_EventResource3.default);

module.exports = AmoCRM;