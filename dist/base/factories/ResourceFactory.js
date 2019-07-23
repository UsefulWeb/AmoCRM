"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BehaviorFactory = require("../BehaviorFactory");

var _BehaviorFactory2 = _interopRequireDefault(_BehaviorFactory);

var _ActiveRecordHandler = require("../ActiveRecordHandler");

var _ActiveRecordHandler2 = _interopRequireDefault(_ActiveRecordHandler);

var _EntityTarget = require("../EntityTarget");

var _EntityTarget2 = _interopRequireDefault(_EntityTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceFactory = function () {

  /**
   * @param connection {AmoConnection}
   */

  /**
   * @param resourceClass {RemoteResource}
   */
  function ResourceFactory(connection) {
    _classCallCheck(this, ResourceFactory);

    var resourceClass = this.constructor.resourceClass;
    /**
     * @param _resource {RemoteResource}
     */

    this._resource = new resourceClass(connection);
    _BehaviorFactory2.default.assignBehaviors(this, this.constructor.behaviors);
  }

  _createClass(ResourceFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _constructor = this.constructor,
          activeRecordClass = _constructor.activeRecordClass,
          activeRecordHandlerClass = _constructor.activeRecordHandlerClass,
          entityTargetClass = _constructor.entityTargetClass,
          entity = new activeRecordClass(this._resource, attributes),
          handler = new activeRecordHandlerClass(entity),
          type = activeRecordClass.name,
          entityTarget = new entityTargetClass(type);

      return new Proxy(entityTarget, handler);
    }
  }, {
    key: "of",
    value: function of() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.create(attributes);
    }
  }, {
    key: "from",
    value: function from() {
      var _this = this;

      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return items.map(function (item) {
        return _this.of(item);
      });
    }
  }], [{
    key: "createFromResource",
    value: function createFromResource(resource) {
      return new this(resource.connection);
    }
  }]);

  return ResourceFactory;
}();

ResourceFactory.activeRecordHandlerClass = _ActiveRecordHandler2.default;
ResourceFactory.entityTargetClass = _EntityTarget2.default;
ResourceFactory.behaviors = [];
exports.default = ResourceFactory;