'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AmoConnection = require('./base/AmoConnection');

var _AmoConnection2 = _interopRequireDefault(_AmoConnection);

var _PrivateDomainRequest = require('./base/requests/domain/PrivateDomainRequest');

var _PrivateDomainRequest2 = _interopRequireDefault(_PrivateDomainRequest);

var _ResourceFactoryBuilder = require('./base/ResourceFactoryBuilder');

var _ResourceFactoryBuilder2 = _interopRequireDefault(_ResourceFactoryBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmoCRM = function () {
  function AmoCRM(options) {
    _classCallCheck(this, AmoCRM);

    if (!options) {
      throw new Error('Wrong configuration');
    }
    this._options = options;
    this._request = new _PrivateDomainRequest2.default(options.domain);
    this._connection = new _AmoConnection2.default(this._request, options.auth);

    this.assignFactories();
  }

  _createClass(AmoCRM, [{
    key: 'assignFactories',
    value: function assignFactories() {
      var builder = new _ResourceFactoryBuilder2.default(this._request),
          factories = builder.getResourceFactories();
      Object.assign(this, factories);
    }
  }, {
    key: 'connect',
    value: function connect() {
      return this._connection.connect();
    }
  }, {
    key: 'request',
    get: function get() {
      var _this = this;

      return {
        get: function get() {
          var _request;

          return (_request = _this._request).get.apply(_request, arguments);
        },
        post: function post() {
          var _request2;

          return (_request2 = _this._request).post.apply(_request2, arguments);
        }
      };
    }
  }]);

  return AmoCRM;
}();

module.exports = AmoCRM;