"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require("../../../api/factories");

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasFields = function () {
  function HasFields() {
    _classCallCheck(this, HasFields);
  }

  _createClass(HasFields, [{
    key: "addField",
    value: function addField(note) {
      if (!note.isNew()) {
        throw new Error('field must not exists!');
      }
      var ENTITY_TYPE = this._resource.constructor.ENTITY_TYPE;

      note.element_type = ENTITY_TYPE;
      note.element_id = this._attributes.id;
      return note.save();
    }
  }, {
    key: "getFields",
    value: function getFields(params) {
      var factory = _factories2.default.Field,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          element_type = resource.constructor.ENTITY_TYPE,
          criteria = _extends({}, params, {
        element_type: element_type
      });


      return factoryInstance.find(criteria);
    }
  }, {
    key: "fields",
    get: function get() {
      var _this = this;

      return {
        add: function add(field) {
          return _this.addField(field);
        },
        get: function get(params) {
          return _this.getFields(params);
        }
      };
    }
  }]);

  return HasFields;
}();

exports.default = Notable;