'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resources = require('../../../api/resources');

var _resources2 = _interopRequireDefault(_resources);

var _factories = require('../../../api/factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasElementByField = function () {
  function HasElementByField(resourceField) {
    _classCallCheck(this, HasElementByField);

    this._HasElementById__elementResourceField = resourceField;
  }

  _createClass(HasElementByField, [{
    key: 'getElementFactoryClassName',
    value: function getElementFactoryClassName() {
      var resourceNames = Object.keys(_resources2.default),
          field = this._HasElementById__elementResourceField,
          value = this._attributes.element_type;

      for (var i = 0, len = resourceNames.length; i < len; i++) {
        var name = resourceNames[i],
            resource = _resources2.default[name];
        if (value === resource[field]) {
          return _factories2.default[name];
        }
      }
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      if (this.isNew()) {
        throw new Error('entity must exists!');
      }
      var factoryClassName = this.getElementFactoryClassName(),
          factory = factoryClassName.createFromResource(this._resource);

      return factory.findById(this._attributes.element_id);
    }
  }]);

  return HasElementByField;
}();

exports.default = HasElementByField;