"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BehaviorFactory = require("../BehaviorFactory");

var _BehaviorFactory2 = _interopRequireDefault(_BehaviorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceFactory = function () {

  /**
   * @param request {DomainRequest}
   */

  /**
   * @param resourceClass {RemoteResource}
   */
  function ResourceFactory(request) {
    _classCallCheck(this, ResourceFactory);

    var resourceClass = this.constructor.resourceClass;
    /**
     * @param _resource {RemoteResource}
     */

    this._resource = new resourceClass(request);
    _BehaviorFactory2.default.assignBehaviors(this, this.constructor.behaviors);
  }

  _createClass(ResourceFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new this.constructor.entityClass(this._resource, attributes);
    }
  }], [{
    key: "createFromResource",
    value: function createFromResource(resource) {
      var request = resource.getDomainRequest();

      return new this.constructor(request);
    }
  }]);

  return ResourceFactory;
}();

ResourceFactory.behaviors = [];
exports.default = ResourceFactory;