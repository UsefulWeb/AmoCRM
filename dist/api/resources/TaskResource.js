'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

var _PrivateRemovable = require('../../base/resources/behaviors/PrivateRemovable');

var _PrivateRemovable2 = _interopRequireDefault(_PrivateRemovable);

var _HasMultiactions = require('../../base/resources/behaviors/HasMultiactions');

var _HasMultiactions2 = _interopRequireDefault(_HasMultiactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskResource = function (_EntityResource) {
  _inherits(TaskResource, _EntityResource);

  function TaskResource() {
    _classCallCheck(this, TaskResource);

    return _possibleConstructorReturn(this, (TaskResource.__proto__ || Object.getPrototypeOf(TaskResource)).apply(this, arguments));
  }

  _createClass(TaskResource, null, [{
    key: 'getElementType',
    value: function getElementType(value) {
      var types = this.ELEMENT_TYPES,
          compareKey = function compareKey(key) {
        return types[key] === value;
      },
          type = Object.keys(types).filter(compareKey)[0];

      return type.toLowerCase();
    }
  }]);

  return TaskResource;
}(_EntityResource3.default);

TaskResource.path = _apiUrls2.default.entities.tasks.path;
TaskResource.deletePath = _apiUrls2.default.entities.tasks.deletePath;
TaskResource.ENTITY_TYPE = 4;
TaskResource.NOTE_ELEMENT_TYPE = 4;
TaskResource.behaviors = [new _PrivateRemovable2.default(), new _HasMultiactions2.default()];
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
exports.default = TaskResource;