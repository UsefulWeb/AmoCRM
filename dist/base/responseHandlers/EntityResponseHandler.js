'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResponseHandler2 = require('./ResponseHandler');

var _ResponseHandler3 = _interopRequireDefault(_ResponseHandler2);

var _EntityResponseErrorHandler = require('../errorHandlers/EntityResponseErrorHandler');

var _EntityResponseErrorHandler2 = _interopRequireDefault(_EntityResponseErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityResponseHandler = function (_ResponseHandler) {
  _inherits(EntityResponseHandler, _ResponseHandler);

  function EntityResponseHandler() {
    _classCallCheck(this, EntityResponseHandler);

    return _possibleConstructorReturn(this, (EntityResponseHandler.__proto__ || Object.getPrototypeOf(EntityResponseHandler)).apply(this, arguments));
  }

  _createClass(EntityResponseHandler, [{
    key: 'getItems',
    value: function getItems() {
      var items = this._response._embedded && this._response._embedded.items;
      return items || [];
    }
  }, {
    key: 'getFirstItem',
    value: function getFirstItem() {
      return this.getItems()[0] || {};
    }
  }]);

  return EntityResponseHandler;
}(_ResponseHandler3.default);

EntityResponseHandler.errorHandlerClass = _EntityResponseErrorHandler2.default;
exports.default = EntityResponseHandler;