'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityResource = require('../../base/resources/EntityResource');

var _EntityResource2 = _interopRequireDefault(_EntityResource);

var _v = require('../../routes/v2');

var _v2 = _interopRequireDefault(_v);

var _RemovableEntityResource = require('../../base/resources/RemovableEntityResource');

var _RemovableEntityResource2 = _interopRequireDefault(_RemovableEntityResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeadResource = function (_RemoveableEntityReso) {
  _inherits(LeadResource, _RemoveableEntityReso);

  function LeadResource() {
    _classCallCheck(this, LeadResource);

    return _possibleConstructorReturn(this, (LeadResource.__proto__ || Object.getPrototypeOf(LeadResource)).apply(this, arguments));
  }

  return LeadResource;
}(_RemovableEntityResource2.default);

LeadResource.path = _v2.default.entities.leads.path;
LeadResource.deletePath = _v2.default.entities.leads.deletePath;
LeadResource.ENTITY_TYPE = 2;
exports.default = LeadResource;