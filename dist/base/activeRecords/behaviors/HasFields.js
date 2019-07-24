'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require('../../../api/factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasFields = function () {
  function HasFields() {
    _classCallCheck(this, HasFields);
  }

  _createClass(HasFields, [{
    key: 'addFields',
    value: function addFields(fields) {
      var _this = this;

      var factory = fields[0].factory,
          data = fields.map(function (field) {
        return _this.prepareField(field);
      });

      return factory.insert(data);
    }
  }, {
    key: 'prepareField',
    value: function prepareField(field) {
      if (!field.isNew()) {
        throw new Error('field must not exists!');
      }
      var ENTITY_TYPE = this._resource.constructor.ENTITY_TYPE;

      field.element_type = ENTITY_TYPE;
      field.element_id = this._attributes.id;
      return field;
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
    key: 'Field',
    get: function get() {
      if (this.isNew()) {
        throw new Error('record must exists!');
      }
      var behavior = this;
      return function () {
        var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var Field = _factories2.default.Field.createFromResource(behavior._resource),
            field = Field.create(attributes);
        return behavior.prepareField(field);
      };
    }
  }, {
    key: 'fields',
    get: function get() {
      var _this2 = this;

      return {
        create: function create(attributes) {
          return new _this2.Field(attributes);
        },
        add: function add(fields) {
          return _this2.addFields(fields);
        },
        get: function get(params) {
          return _this2.getFields(params);
        }
      };
    }
  }]);

  return HasFields;
}();

exports.default = HasFields;