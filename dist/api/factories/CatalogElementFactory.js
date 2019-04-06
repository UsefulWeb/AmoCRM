'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CatalogElement = require('../activeRecords/CatalogElement');

var _CatalogElement2 = _interopRequireDefault(_CatalogElement);

var _CatalogElementResource = require('../resources/CatalogElementResource');

var _CatalogElementResource2 = _interopRequireDefault(_CatalogElementResource);

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Removable = require('../../base/factories/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CatalogElementFactory = function (_EntityFactory) {
  _inherits(CatalogElementFactory, _EntityFactory);

  function CatalogElementFactory() {
    _classCallCheck(this, CatalogElementFactory);

    return _possibleConstructorReturn(this, (CatalogElementFactory.__proto__ || Object.getPrototypeOf(CatalogElementFactory)).apply(this, arguments));
  }

  return CatalogElementFactory;
}(_EntityFactory3.default);

CatalogElementFactory.activeRecordClass = _CatalogElement2.default;
CatalogElementFactory.resourceClass = _CatalogElementResource2.default;
CatalogElementFactory.behaviors = [].concat(_toConsumableArray(_EntityFactory3.default.behaviors), [new _Removable2.default()]);
exports.default = CatalogElementFactory;