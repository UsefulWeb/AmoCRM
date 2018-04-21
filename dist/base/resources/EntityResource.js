"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RemoteResource2 = require("./RemoteResource");

var _RemoteResource3 = _interopRequireDefault(_RemoteResource2);

var _EntityResponseHandler = require("../responseHandlers/EntityResponseHandler");

var _EntityResponseHandler2 = _interopRequireDefault(_EntityResponseHandler);

var _Updatable = require("./behaviors/Updatable");

var _Updatable2 = _interopRequireDefault(_Updatable);

var _Insertable = require("./behaviors/Insertable");

var _Insertable2 = _interopRequireDefault(_Insertable);

var _Findable = require("./behaviors/Findable");

var _Findable2 = _interopRequireDefault(_Findable);

var _FindableById = require("./behaviors/FindableById");

var _FindableById2 = _interopRequireDefault(_FindableById);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityResource = function (_RemoteResource) {
  _inherits(EntityResource, _RemoteResource);

  function EntityResource() {
    _classCallCheck(this, EntityResource);

    return _possibleConstructorReturn(this, (EntityResource.__proto__ || Object.getPrototypeOf(EntityResource)).apply(this, arguments));
  }

  return EntityResource;
}(_RemoteResource3.default);

EntityResource.responseHandlerClass = _EntityResponseHandler2.default;
EntityResource.DELETE_MULTIACTION_TYPE = 4;
EntityResource.behaviors = [new _Findable2.default(), new _FindableById2.default(), new _Updatable2.default(), new _Insertable2.default()];
exports.default = EntityResource;