'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IncomingLead = require('../activeRecords/IncomingLead');

var _IncomingLead2 = _interopRequireDefault(_IncomingLead);

var _IncomingLeadResource = require('../resources/IncomingLeadResource');

var _IncomingLeadResource2 = _interopRequireDefault(_IncomingLeadResource);

var _ResourceFactory2 = require('../../base/factories/ResourceFactory');

var _ResourceFactory3 = _interopRequireDefault(_ResourceFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IncomingLeadFactory = function (_ResourceFactory) {
  _inherits(IncomingLeadFactory, _ResourceFactory);

  function IncomingLeadFactory() {
    _classCallCheck(this, IncomingLeadFactory);

    return _possibleConstructorReturn(this, (IncomingLeadFactory.__proto__ || Object.getPrototypeOf(IncomingLeadFactory)).apply(this, arguments));
  }

  _createClass(IncomingLeadFactory, [{
    key: 'insertAsSIP',
    value: function insertAsSIP(data) {
      return this._resource.insertAsSIP(data);
    }
  }, {
    key: 'insertAsFormData',
    value: function insertAsFormData(data) {
      return this._resource.insertAsFormData(data);
    }
  }, {
    key: 'accept',
    value: function accept(data) {
      return this._resource.accept(data);
    }
  }, {
    key: 'decline',
    value: function decline(data) {
      return this._resource.decline(data);
    }
  }]);

  return IncomingLeadFactory;
}(_ResourceFactory3.default);

IncomingLeadFactory.activeRecordClass = _IncomingLead2.default;
IncomingLeadFactory.resourceClass = _IncomingLeadResource2.default;
IncomingLeadFactory.behaviors = [];
exports.default = IncomingLeadFactory;