'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('../activeRecords/Field');

var _Field2 = _interopRequireDefault(_Field);

var _FieldResource = require('../resources/FieldResource');

var _FieldResource2 = _interopRequireDefault(_FieldResource);

var _ResourceFactory2 = require('../../base/factories/ResourceFactory');

var _ResourceFactory3 = _interopRequireDefault(_ResourceFactory2);

var _Updatable = require('../../base/factories/behaviors/Updatable');

var _Updatable2 = _interopRequireDefault(_Updatable);

var _Insertable = require('../../base/factories/behaviors/Insertable');

var _Insertable2 = _interopRequireDefault(_Insertable);

var _Removable = require('../../base/factories/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldFactory = function (_ResourceFactory) {
  _inherits(FieldFactory, _ResourceFactory);

  function FieldFactory() {
    var _ref;

    _classCallCheck(this, FieldFactory);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = FieldFactory.__proto__ || Object.getPrototypeOf(FieldFactory)).call.apply(_ref, [this].concat(args)));

    _this.ELEMENT_TYPE = _FieldResource2.default.ELEMENT_TYPES;
    _this.TYPE = _FieldResource2.default.TYPES;
    return _this;
  }

  _createClass(FieldFactory, [{
    key: 'createTypedEntities',
    value: function createTypedEntities(data, type) {
      var _this2 = this;

      var resourceClass = this.constructor.resourceClass,
          ELEMENT_TYPE = type.slice(0, -1).toUpperCase(),
          element_type = resourceClass.ELEMENT_TYPES[ELEMENT_TYPE];


      return Object.keys(data).reduce(function (target, id) {
        var entity = _this2.create(data[id]);
        entity.element_type = element_type;
        target.push(entity);
        return target;
      }, []);
    }
  }, {
    key: 'find',
    value: function find() {
      var _this3 = this;

      return this._resource.find().then(function (data) {
        return Object.keys(data).reduce(function (target, type) {
          target.push.apply(target, _toConsumableArray(_this3.createTypedEntities(data[type], type)));
          return target;
        }, []);
      });
    }
  }]);

  return FieldFactory;
}(_ResourceFactory3.default);

FieldFactory.activeRecordClass = _Field2.default;
FieldFactory.resourceClass = _FieldResource2.default;
FieldFactory.behaviors = [new _Updatable2.default(), new _Insertable2.default(), new _Removable2.default()];
exports.default = FieldFactory;