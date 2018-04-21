'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceFactory2 = require('./ResourceFactory');

var _ResourceFactory3 = _interopRequireDefault(_ResourceFactory2);

var _BaseActiveRecord = require('../activeRecords/BaseActiveRecord');

var _BaseActiveRecord2 = _interopRequireDefault(_BaseActiveRecord);

var _Findable = require('./behaviors/Findable');

var _Findable2 = _interopRequireDefault(_Findable);

var _FindableById = require('./behaviors/FindableById');

var _FindableById2 = _interopRequireDefault(_FindableById);

var _Insertable = require('./behaviors/Insertable');

var _Insertable2 = _interopRequireDefault(_Insertable);

var _Updatable = require('./behaviors/Updatable');

var _Updatable2 = _interopRequireDefault(_Updatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityFactory = function (_ResourceFactory) {
  _inherits(EntityFactory, _ResourceFactory);

  function EntityFactory() {
    _classCallCheck(this, EntityFactory);

    return _possibleConstructorReturn(this, (EntityFactory.__proto__ || Object.getPrototypeOf(EntityFactory)).apply(this, arguments));
  }

  _createClass(EntityFactory, [{
    key: 'getDataAttributes',
    value: function getDataAttributes() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return data.map(function (item) {
        return item instanceof _BaseActiveRecord2.default ? item.attributes : item;
      });
    }
  }, {
    key: 'getDataIdentifiers',
    value: function getDataIdentifiers() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.getDataAttributes(data).map(function (item) {
        return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.id : item;
      });
    }
  }]);

  return EntityFactory;
}(_ResourceFactory3.default);

EntityFactory.behaviors = [new _Findable2.default(), new _FindableById2.default(), new _Insertable2.default(), new _Updatable2.default()];
exports.default = EntityFactory;