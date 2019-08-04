"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require("../../../factories");

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasCustomers = function () {
  function HasCustomers() {
    _classCallCheck(this, HasCustomers);
  }

  _createClass(HasCustomers, [{
    key: "addCustomers",
    value: function addCustomers(customers) {
      var _customer = customer,
          _customer$contacts_id = _customer.contacts_id,
          contacts_id = _customer$contacts_id === undefined ? [] : _customer$contacts_id;

      this._attributes.customers = contacts_id.push(this._attributes.id);
      customer.contacts_id = contacts_id;
      return customer.save();
    }
  }, {
    key: "addCustomer",
    value: function addCustomer(customer) {
      var _customer$contacts_id2 = customer.contacts_id,
          contacts_id = _customer$contacts_id2 === undefined ? [] : _customer$contacts_id2;

      contacts_id.push(this._attributes.id);
      customer.contacts_id = contacts_id;
      return customer.save();
    }
  }, {
    key: "getCustomers",
    value: function getCustomers(params) {
      var factory = _factories2.default.Customer,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          criteria = _extends({}, params, {
        contact_id: this._attributes.id
      });

      return factoryInstance.find(criteria);
    }
  }]);

  return HasCustomers;
}();

exports.default = HasCustomers;