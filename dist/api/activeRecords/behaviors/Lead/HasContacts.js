"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require("../../../factories");

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasContacts = function () {
  function HasContacts() {
    _classCallCheck(this, HasContacts);
  }

  _createClass(HasContacts, [{
    key: "linkContacts",
    value: function linkContacts() {
      var contacts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var newIds = this.getDataIdentifiers(contacts),
          _attributes$contacts_ = this._attributes.contacts_id,
          contacts_id = _attributes$contacts_ === undefined ? [] : _attributes$contacts_;


      var ids = Array.isArray(contacts_id) ? contacts_id : [contacts_id];

      ids.push.apply(ids, _toConsumableArray(newIds));
      this._attributes.contacts_id = ids;
      return this.save();
    }
  }, {
    key: "unlinkContacts",
    value: function unlinkContacts() {
      var contacts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var ids = this.getDataIdentifiers(contacts);
      this._attributes.unlink = {
        contacts_id: ids
      };

      return this.save();
    }
  }, {
    key: "getContacts",
    value: function getContacts() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var contacts_id = this._attributes.contacts_id;

      if (!contacts_id) {
        return Promise.resolve([]);
      }
      var ids = Array.isArray(contacts_id) ? contacts_id : [contacts_id],
          Contact = _factories2.default.Contact.createFromResource(this._resource);

      return Contact.find(_extends({}, params, {
        id: ids
      }));
    }
  }, {
    key: "contacts",
    get: function get() {
      var _this = this;

      return {
        link: function link(contacts) {
          return _this.linkContacts(contacts);
        },
        get: function get(params) {
          return _this.getContacts(params);
        },
        unlink: function unlink(contacts) {
          return _this.unlinkContacts(contacts);
        }
      };
    }
  }]);

  return HasContacts;
}();

exports.default = HasContacts;