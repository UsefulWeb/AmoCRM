"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceFactory = function () {

  /**
   * @param connection {AmoConnection}
   */
  function ResourceFactory(connection) {
    _classCallCheck(this, ResourceFactory);

    var resourceClass = this.constructor.resourceClass;
    /**
     * @param _resource {RemoteResource}
     */

    this._resource = new resourceClass(connection);
  }
  /**
   * @param resourceClass {RemoteResource}
   */


  _createClass(ResourceFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new this.constructor.entityClass(this._resource, attributes);
    }
  }]);

  return ResourceFactory;
}();

exports.default = ResourceFactory;