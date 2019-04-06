'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var Catalog = function (_EntityActiveRecord) {
  _inherits(Catalog, _EntityActiveRecord);

  function Catalog() {
    _classCallCheck(this, Catalog);

    return _possibleConstructorReturn(this, (Catalog.__proto__ || Object.getPrototypeOf(Catalog)).apply(this, arguments));
  }

  _createClass(Catalog, [{
    key: 'addCatalogElement',
    value: function addCatalogElement(catalogElement) {
      catalogElement.catalog_id = this._attributes.id;
      return catalogElement.save();
    }
  }, {
    key: 'getCatalogElements',
    value: function getCatalogElements(params) {
      var factory = _factories2.default.CatalogElement,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          criteria = _extends({}, params, {
        catalog_id: this._attributes.id
      });

      return factoryInstance.find(criteria);
    }
  }, {
    key: 'elements',
    get: function get() {
      var _this2 = this;

      return {
        add: function add(catalogElement) {
          return _this2.addCatalogElement(catalogElement);
        },
        get: function get(params) {
          return _this2.getCatalogElements(params);
        }
      };
    }
  }]);

  return Catalog;
}(_EntityActiveRecord3.default);

Catalog.behaviors = [new _Removable2.default()];
exports.default = Catalog;