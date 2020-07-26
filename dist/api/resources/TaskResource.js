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

var _hasElementTypeByKey = require('../../base/resources/behaviors/static/hasElementTypeByKey');

var _hasElementTypeByKey2 = _interopRequireDefault(_hasElementTypeByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes Removable
 * @mixes Removable
 * @mixes HasMultiactions
 */
var TaskResource = function (_EntityResource) {
  _inherits(TaskResource, _EntityResource);

  function TaskResource() {
    _classCallCheck(this, TaskResource);

    return _possibleConstructorReturn(this, (TaskResource.__proto__ || Object.getPrototypeOf(TaskResource)).apply(this, arguments));
  }

  return TaskResource;
}(_EntityResource3.default);

TaskResource.path = _apiUrls2.default.entities.tasks.path;
TaskResource.deletePath = _apiUrls2.default.entities.tasks.deletePath;
TaskResource.ENTITY_TYPE = 4;
TaskResource.NOTE_ELEMENT_TYPE = 4;
TaskResource.behaviors = [].concat(_toConsumableArray(_EntityResource3.default.behaviors), [new _PrivateRemovable2.default(), new _HasMultiactions2.default()]);
TaskResource.TASK_TYPES = {
  CALL: 1,
  MEETING: 2,
  MAIL: 3
};
TaskResource.ELEMENT_TYPES = {
  CONTACT: 1,
  LEAD: 2,
  COMPANY: 3,
  CUSTOMER: 12
};
TaskResource.getElementType = (0, _hasElementTypeByKey2.default)('ELEMENT_TYPES');
exports.default = TaskResource;