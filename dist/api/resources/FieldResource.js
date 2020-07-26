'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _RemoteResource2 = require('../../base/resources/RemoteResource');

var _RemoteResource3 = _interopRequireDefault(_RemoteResource2);

var _Removable = require('../../base/resources/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _Updatable = require('../../base/resources/behaviors/Updatable');

var _Updatable2 = _interopRequireDefault(_Updatable);

var _Insertable = require('../../base/resources/behaviors/Insertable');

var _Insertable2 = _interopRequireDefault(_Insertable);

var _Findable = require('./behaviors/Field/Findable');

var _Findable2 = _interopRequireDefault(_Findable);

var _hasElementTypeByKey = require('../../base/resources/behaviors/static/hasElementTypeByKey');

var _hasElementTypeByKey2 = _interopRequireDefault(_hasElementTypeByKey);

var _EntityResponseHandler = require('../../base/responseHandlers/EntityResponseHandler');

var _EntityResponseHandler2 = _interopRequireDefault(_EntityResponseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes Removable
 * @mixes Updatable
 * @mixes Insertable
 * @mixes Findable
 */
var FieldResource = function (_RemoteResource) {
  _inherits(FieldResource, _RemoteResource);

  function FieldResource() {
    _classCallCheck(this, FieldResource);

    return _possibleConstructorReturn(this, (FieldResource.__proto__ || Object.getPrototypeOf(FieldResource)).apply(this, arguments));
  }

  return FieldResource;
}(_RemoteResource3.default);

FieldResource.path = _apiUrls2.default.entities.fields.path;
FieldResource.getPath = _apiUrls2.default.account;
FieldResource.deletePath = _apiUrls2.default.entities.fields.path;
FieldResource.responseHandlerClass = _EntityResponseHandler2.default;
FieldResource.behaviors = [new _Removable2.default(), new _Updatable2.default(), new _Insertable2.default(), new _Findable2.default()];
FieldResource.ELEMENT_TYPES = {
  CONTACT: 1,
  LEAD: 2,
  COMPANY: 3,
  CUSTOMER: 12
};
FieldResource.TYPES = {
  TEXT: 1,
  NUMERIC: 2,
  CHECKBOX: 3,
  SELECT: 4,
  MULTISELECT: 5,
  DATE: 6,
  URL: 7,
  MULTITEXT: 8,
  TEXTAREA: 9,
  RADIOBUTTON: 10,
  STREETADDRESS: 11,
  SMART_ADDRESS: 12,
  BIRTHDAY: 13
};
FieldResource.getElementType = (0, _hasElementTypeByKey2.default)('ELEMENT_TYPES');
FieldResource.getType = (0, _hasElementTypeByKey2.default)('TYPES');
exports.default = FieldResource;