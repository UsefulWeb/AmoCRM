'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Company = require('../activeRecords/Company');

var _Company2 = _interopRequireDefault(_Company);

var _CompanyResource = require('../resources/CompanyResource');

var _CompanyResource2 = _interopRequireDefault(_CompanyResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyFactory = function (_EntityFactory) {
  _inherits(CompanyFactory, _EntityFactory);

  function CompanyFactory() {
    _classCallCheck(this, CompanyFactory);

    return _possibleConstructorReturn(this, (CompanyFactory.__proto__ || Object.getPrototypeOf(CompanyFactory)).apply(this, arguments));
  }

  return CompanyFactory;
}(_EntityFactory3.default);

CompanyFactory.entityClass = _Company2.default;
CompanyFactory.resourceClass = _CompanyResource2.default;
exports.default = CompanyFactory;