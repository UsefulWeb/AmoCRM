'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

var _Removable = require('../../base/resources/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerResource = function (_EntityResource) {
  _inherits(CustomerResource, _EntityResource);

  function CustomerResource() {
    _classCallCheck(this, CustomerResource);

    return _possibleConstructorReturn(this, (CustomerResource.__proto__ || Object.getPrototypeOf(CustomerResource)).apply(this, arguments));
  }

  return CustomerResource;
}(_EntityResource3.default);

CustomerResource.path = _apiUrls2.default.entities.customers.path;
CustomerResource.deletePath = _apiUrls2.default.entities.customers.deletePath;
CustomerResource.NOTE_ELEMENT_TYPE = 12;
CustomerResource.TASK_ELEMENT_TYPE = 12;
CustomerResource.behaviors = [].concat(_toConsumableArray(_EntityResource3.default.behaviors), [new _Removable2.default()]);
exports.default = CustomerResource;