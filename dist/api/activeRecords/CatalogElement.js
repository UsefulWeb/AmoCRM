'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityActiveRecord2 = require('../../base/activeRecords/EntityActiveRecord');

var _EntityActiveRecord3 = _interopRequireDefault(_EntityActiveRecord2);

var _Removable = require('../../base/activeRecords/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _factories = require('../factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes CatalogElement
 */
var CatalogElement = function (_EntityActiveRecord) {
  _inherits(CatalogElement, _EntityActiveRecord);

  function CatalogElement() {
    _classCallCheck(this, CatalogElement);

    return _possibleConstructorReturn(this, (CatalogElement.__proto__ || Object.getPrototypeOf(CatalogElement)).apply(this, arguments));
  }

  _createClass(CatalogElement, [{
    key: 'getCatalog',
    value: function getCatalog() {
      var factory = _factories2.default.Catalog,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource);

      return factoryInstance.findById(this._attributes.catalog_id);
    }
  }]);

  return CatalogElement;
}(_EntityActiveRecord3.default);

CatalogElement.behaviors = [new _Removable2.default()];
exports.default = CatalogElement;