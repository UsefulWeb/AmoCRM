"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require("../../../api/factories");

var _factories2 = _interopRequireDefault(_factories);

var _TaskResource = require("../../../api/resources/TaskResource");

var _TaskResource2 = _interopRequireDefault(_TaskResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Taskable = function () {
  function Taskable() {
    _classCallCheck(this, Taskable);
  }

  _createClass(Taskable, [{
    key: "addTask",
    value: function addTask(task) {
      if (!task.isNew()) {
        throw new Error('task must not exists!');
      }
      var TASK_ELEMENT_TYPE = this._resource.constructor.TASK_ELEMENT_TYPE;

      task.element_type = TASK_ELEMENT_TYPE;
      task.element_id = this._attributes.id;
      return task.save();
    }
  }, {
    key: "getTasks",
    value: function getTasks(params) {
      var factory = _factories2.default.Task,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          resourceConstructor = resource.constructor,
          TASK_ELEMENT_TYPE = resourceConstructor.TASK_ELEMENT_TYPE,
          type = _TaskResource2.default.getElementType(TASK_ELEMENT_TYPE),
          criteria = _extends({}, params, {
        type: type,
        element_id: this._attributes.id
      });


      return factoryInstance.find(criteria);
    }
  }, {
    key: "tasks",
    get: function get() {
      var _this = this;

      return {
        add: function add(task) {
          return _this.addTask(task);
        },
        get: function get(params) {
          return _this.getTasks(params);
        }
      };
    }
  }]);

  return Taskable;
}();

exports.default = Taskable;