'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Lead = require('../activeRecords/Lead');

var _Lead2 = _interopRequireDefault(_Lead);

var _LeadResource = require('../resources/LeadResource');

var _LeadResource2 = _interopRequireDefault(_LeadResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeadFactory = function (_EntityFactory) {
  _inherits(LeadFactory, _EntityFactory);

  function LeadFactory() {
    _classCallCheck(this, LeadFactory);

    return _possibleConstructorReturn(this, (LeadFactory.__proto__ || Object.getPrototypeOf(LeadFactory)).apply(this, arguments));
  }

  return LeadFactory;
}(_EntityFactory3.default);

LeadFactory.entityClass = _Lead2.default;
LeadFactory.resourceClass = _LeadResource2.default;
exports.default = LeadFactory;