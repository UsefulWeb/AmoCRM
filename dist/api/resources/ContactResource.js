'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('../../routes/v2');

var _v2 = _interopRequireDefault(_v);

var _RemovableEntityResource = require('../../base/resources/RemovableEntityResource');

var _RemovableEntityResource2 = _interopRequireDefault(_RemovableEntityResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactResource = function (_RemoveableEntityReso) {
  _inherits(ContactResource, _RemoveableEntityReso);

  function ContactResource() {
    _classCallCheck(this, ContactResource);

    return _possibleConstructorReturn(this, (ContactResource.__proto__ || Object.getPrototypeOf(ContactResource)).apply(this, arguments));
  }

  return ContactResource;
}(_RemovableEntityResource2.default);

ContactResource.path = _v2.default.entities.contacts.path;
ContactResource.deletePath = _v2.default.entities.contacts.deletePath;
ContactResource.ENTITY_TYPE = 17;
exports.default = ContactResource;