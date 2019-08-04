'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require('../../../api/factories');

var _factories2 = _interopRequireDefault(_factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasCompany = function () {
  function HasCompany() {
    _classCallCheck(this, HasCompany);
  }

  _createClass(HasCompany, [{
    key: 'linkCompany',
    value: function linkCompany(company) {
      this._attributes.company_id = (typeof company === 'undefined' ? 'undefined' : _typeof(company)) === 'object' ? company.id : company;

      return this.save();
    }
  }, {
    key: 'getCompany',
    value: function getCompany() {
      var Company = _factories2.default.Company.createFromResource(this._resource);

      return Company.find({
        id: this._attributes.company_id
      });
    }
  }, {
    key: 'unlinkCompany',
    value: function unlinkCompany() {
      this._attributes.unlink = {
        company_id: this._attributes.company_id
      };

      return this.save();
    }
  }]);

  return HasCompany;
}();

exports.default = HasCompany;