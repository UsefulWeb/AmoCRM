'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BehaviorFactory = require('../BehaviorFactory');

var _BehaviorFactory2 = _interopRequireDefault(_BehaviorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RemoteResource = function () {
  /**
   * @param request {DomainRequest}
   */
  function RemoteResource(request) {
    _classCallCheck(this, RemoteResource);

    this._request = request;
    _BehaviorFactory2.default.assignBehaviors(this, this.constructor.behaviors);
  }

  _createClass(RemoteResource, [{
    key: 'getDomainRequest',
    value: function getDomainRequest() {
      return this._request;
    }
  }, {
    key: 'transformTo',
    value: function transformTo(resourceClass) {
      return new resourceClass(this._request);
    }
  }, {
    key: 'request',
    value: function request(method, path, data, options) {
      var _this = this;

      return this._request.request(path, data, method, options).then(function (response) {
        return _this.handleResponse(response);
      });
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(response) {
      var responseHandlerClass = this.constructor.responseHandlerClass;

      if (!responseHandlerClass) {
        return response;
      }
      return new responseHandlerClass(response);
    }
  }, {
    key: 'apiRequest',
    value: function apiRequest(method, path, data) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return this.request(method, path, data, _extends({}, options, {
        useAPIAuth: true
      }));
    }
  }], [{
    key: 'createFrom',
    value: function createFrom(resourceInstance) {
      return new this.constructor(resourceInstance.getDomainRequest());
    }
  }]);

  return RemoteResource;
}();

RemoteResource.behaviors = [];
exports.default = RemoteResource;