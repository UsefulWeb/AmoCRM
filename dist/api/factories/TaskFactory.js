'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Task = require('../activeRecords/Task');

var _Task2 = _interopRequireDefault(_Task);

var _TaskResource = require('../resources/TaskResource');

var _TaskResource2 = _interopRequireDefault(_TaskResource);

var _Removable = require('../../base/factories/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskFactory = function (_EntityFactory) {
  _inherits(TaskFactory, _EntityFactory);

  function TaskFactory() {
    var _ref;

    _classCallCheck(this, TaskFactory);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TaskFactory.__proto__ || Object.getPrototypeOf(TaskFactory)).call.apply(_ref, [this].concat(args)));

    _this.ELEMENT_TYPE = {
      CONTACT: 1,
      LEAD: 2,
      COMPANY: 3,
      CUSTOMER: 12
    };
    return _this;
  }

  return TaskFactory;
}(_EntityFactory3.default);

TaskFactory.entityClass = _Task2.default;
TaskFactory.resourceClass = _TaskResource2.default;
TaskFactory.behaviors = [new _Removable2.default()];
exports.default = TaskFactory;