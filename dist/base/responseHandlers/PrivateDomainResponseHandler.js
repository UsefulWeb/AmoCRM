'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DomainResponseHandler = require('./DomainResponseHandler');

var _DomainResponseHandler2 = _interopRequireDefault(_DomainResponseHandler);

var _PrivateDomainResponseErrorHandler = require('../errorHandlers/PrivateDomainResponseErrorHandler');

var _PrivateDomainResponseErrorHandler2 = _interopRequireDefault(_PrivateDomainResponseErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivateDomainResponseHandler = function (_DomainResponseHandle) {
  _inherits(PrivateDomainResponseHandler, _DomainResponseHandle);

  function PrivateDomainResponseHandler() {
    _classCallCheck(this, PrivateDomainResponseHandler);

    return _possibleConstructorReturn(this, (PrivateDomainResponseHandler.__proto__ || Object.getPrototypeOf(PrivateDomainResponseHandler)).apply(this, arguments));
  }

  return PrivateDomainResponseHandler;
}(_DomainResponseHandler2.default);

PrivateDomainResponseHandler.errorHandlerClass = _PrivateDomainResponseErrorHandler2.default;
exports.default = PrivateDomainResponseHandler;