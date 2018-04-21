'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

var _PrivateRemovable = require('../../base/resources/behaviors/PrivateRemovable');

var _PrivateRemovable2 = _interopRequireDefault(_PrivateRemovable);

var _HasMultiactions = require('../../base/resources/behaviors/HasMultiactions');

var _HasMultiactions2 = _interopRequireDefault(_HasMultiactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeadResource = function (_EntityResource) {
  _inherits(LeadResource, _EntityResource);

  function LeadResource() {
    _classCallCheck(this, LeadResource);

    return _possibleConstructorReturn(this, (LeadResource.__proto__ || Object.getPrototypeOf(LeadResource)).apply(this, arguments));
  }

  return LeadResource;
}(_EntityResource3.default);

LeadResource.path = _apiUrls2.default.entities.leads.path;
LeadResource.deletePath = _apiUrls2.default.entities.leads.deletePath;
LeadResource.ENTITY_TYPE = 2;
LeadResource.NOTE_ELEMENT_TYPE = 2;
LeadResource.TASK_ELEMENT_TYPE = 2;
LeadResource.behaviors = [].concat(_toConsumableArray(_EntityResource3.default.behaviors), [new _PrivateRemovable2.default(), new _HasMultiactions2.default()]);
exports.default = LeadResource;