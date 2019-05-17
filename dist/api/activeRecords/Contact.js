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

var Contact = function (_EntityActiveRecord) {
  _inherits(Contact, _EntityActiveRecord);

  function Contact() {
    _classCallCheck(this, Contact);

    return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).apply(this, arguments));
  }

  _createClass(Contact, [{
    key: 'addCustomer',
    value: function addCustomer(customer) {
      customer.contact_id = this._attributes.id;
      return customer.save();
    }
  }, {
    key: 'getCustomers',
    value: function getCustomers(params) {
      var factory = _factories2.default.Customer,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          criteria = _extends({}, params, {
        contact_id: this._attributes.id
      });

      return factoryInstance.find(criteria);
    }
  }, {
    key: 'customers',
    get: function get() {
      var _this2 = this;

      return {
        add: function add(customer) {
          return _this2.addCustomer(customer);
        },
        get: function get(params) {
          return _this2.getCustomers(params);
        }
      };
    }
  }]);

  return Contact;
}(_EntityActiveRecord3.default);

Contact.behaviors = [new _Removable2.default(), new _Notable2.default(), new _Taskable2.default(), new _HasFields2.default()];
exports.default = Contact;