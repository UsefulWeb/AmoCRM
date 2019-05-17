'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityActiveRecord2 = require('../../base/activeRecords/EntityActiveRecord');

var _EntityActiveRecord3 = _interopRequireDefault(_EntityActiveRecord2);

var _Removable = require('../../base/activeRecords/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _Notable = require('../../base/activeRecords/behaviors/Notable');

var _Notable2 = _interopRequireDefault(_Notable);

var _Taskable = require('../../base/activeRecords/behaviors/Taskable');

var _Taskable2 = _interopRequireDefault(_Taskable);

var _HasFields = require('../../base/activeRecords/behaviors/HasFields');

var _HasFields2 = _interopRequireDefault(_HasFields);

var _factories = require('../factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Customer = function (_EntityActiveRecord) {
  _inherits(Customer, _EntityActiveRecord);

  function Customer() {
    _classCallCheck(this, Customer);

    return _possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).apply(this, arguments));
  }

  _createClass(Customer, [{
    key: 'getContact',
    value: function getContact() {
      var factory = _factories2.default.Contact,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource);

      return factoryInstance.findById(this._attributes.contact_id);
    }
  }]);

  return Customer;
}(_EntityActiveRecord3.default);

Customer.behaviors = [new _Removable2.default(), new _Notable2.default(), new _Taskable2.default(), new _HasFields2.default()];
exports.default = Customer;