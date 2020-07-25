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

var TaskResource = function (_RemoveableEntityReso) {
  _inherits(TaskResource, _RemoveableEntityReso);

  function TaskResource() {
    _classCallCheck(this, TaskResource);

    return _possibleConstructorReturn(this, (TaskResource.__proto__ || Object.getPrototypeOf(TaskResource)).apply(this, arguments));
  }

  return TaskResource;
}(_RemovableEntityResource2.default);

TaskResource.path = _v2.default.entities.tasks.path;
TaskResource.deletePath = _v2.default.entities.tasks.deletePath;
exports.default = TaskResource;