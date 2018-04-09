'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Contact = require('../activeRecords/Contact');

var _Contact2 = _interopRequireDefault(_Contact);

var _ContactResource = require('../resources/ContactResource');

var _ContactResource2 = _interopRequireDefault(_ContactResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactFactory = function (_EntityFactory) {
  _inherits(ContactFactory, _EntityFactory);

  function ContactFactory() {
    _classCallCheck(this, ContactFactory);

    return _possibleConstructorReturn(this, (ContactFactory.__proto__ || Object.getPrototypeOf(ContactFactory)).apply(this, arguments));
  }

  return ContactFactory;
}(_EntityFactory3.default);

ContactFactory.entityClass = _Contact2.default;
ContactFactory.resourceClass = _ContactResource2.default;
exports.default = ContactFactory;