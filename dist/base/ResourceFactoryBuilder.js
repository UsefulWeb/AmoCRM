'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require('../api/factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceFactoryBuilder = function () {
  function ResourceFactoryBuilder(connection) {
    _classCallCheck(this, ResourceFactoryBuilder);

    this._connection = connection;
  }

  _createClass(ResourceFactoryBuilder, [{
    key: 'getResourceFactories',
    value: function getResourceFactories() {
      var _this = this;

      return Object.keys(_factories2.default).reduce(function (target, factoryName) {
        target[factoryName] = _this.createResourceFactory(factoryName);
        return target;
      }, {});
    }
  }, {
    key: 'createResourceFactory',
    value: function createResourceFactory(name) {
      var factory = new this.constructor.factories[name](this._connection),
          handler = this.createFactoryHandler(factory),
          constructor = function constructor() {};
      return new Proxy(constructor, handler);
    }
  }, {
    key: 'createFactoryHandler',
    value: function createFactoryHandler(factory) {
      return {
        /**
         * @param target {EntityFactory}
         * @param attributes {object}
         */
        construct: function construct(target, attributes) {
          return factory.create.apply(factory, _toConsumableArray(attributes));
        },
        get: function get(target, attribute) {
          return factory[attribute];
        }
      };
    }
  }]);

  return ResourceFactoryBuilder;
}();

ResourceFactoryBuilder.factories = _factories2.default;
exports.default = ResourceFactoryBuilder;