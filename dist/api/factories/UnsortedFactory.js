'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IncomingLead = require('../activeRecords/IncomingLead');

var _IncomingLead2 = _interopRequireDefault(_IncomingLead);

var _UnsortedResource = require('../resources/UnsortedResource');

var _UnsortedResource2 = _interopRequireDefault(_UnsortedResource);

var _ResourceFactory2 = require('../../base/factories/ResourceFactory');

var _ResourceFactory3 = _interopRequireDefault(_ResourceFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnsortedFactory = function (_ResourceFactory) {
  _inherits(UnsortedFactory, _ResourceFactory);

  function UnsortedFactory() {
    _classCallCheck(this, UnsortedFactory);

    return _possibleConstructorReturn(this, (UnsortedFactory.__proto__ || Object.getPrototypeOf(UnsortedFactory)).apply(this, arguments));
  }

  return UnsortedFactory;
}(_ResourceFactory3.default);

UnsortedFactory.activeRecordClass = _IncomingLead2.default;
UnsortedFactory.resourceClass = _UnsortedResource2.default;
UnsortedFactory.behaviors = [];
exports.default = UnsortedFactory;