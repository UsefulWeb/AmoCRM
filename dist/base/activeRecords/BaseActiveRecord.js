'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BehaviorFactory = require('../BehaviorFactory');

var _BehaviorFactory2 = _interopRequireDefault(_BehaviorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseActiveRecord = function () {
  /**
   * @param resource {EntityResource}
   * @param attributes {object}
   */
  function BaseActiveRecord(resource) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BaseActiveRecord);

    this._resource = resource;
    this._attributes = Object.assign({}, attributes);
    this._isRemoved = false;
    _BehaviorFactory2.default.assignBehaviors(this, this.constructor.behaviors);
  }

  _createClass(BaseActiveRecord, [{
    key: 'removeAttribute',
    value: function removeAttribute(attribute) {
      delete this._attributes[attribute];
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(attribute, value) {
      this._attributes[attribute] = value;
      return this;
    }
  }, {
    key: 'hasAttribute',
    value: function hasAttribute(attribute) {
      return this._attributes.hasOwnProperty(attribute);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(attribute) {
      return this._attributes[attribute];
    }
  }, {
    key: 'isNew',
    value: function isNew() {
      return this._attributes.id === undefined;
    }
  }, {
    key: 'attributes',
    set: function set(attributes) {
      this._attributes = attributes;
    },
    get: function get() {
      return this._attributes;
    }
  }], [{
    key: 'createFrom',
    value: function createFrom(activeRecordInstance) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var resourceConstructor = this._resource.constructor,
          resource = resourceConstructor.createFrom(this._resource);

      return new activeRecordInstance.constructor(resource, attributes);
    }
  }]);

  return BaseActiveRecord;
}();

BaseActiveRecord.behaviors = [];
exports.default = BaseActiveRecord;