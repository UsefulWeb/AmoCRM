'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityActiveRecord2 = require('../../base/activeRecords/EntityActiveRecord');

var _EntityActiveRecord3 = _interopRequireDefault(_EntityActiveRecord2);

var _Removable = require('../../base/activeRecords/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _HasNotes = require('../../base/activeRecords/behaviors/HasNotes');

var _HasNotes2 = _interopRequireDefault(_HasNotes);

var _HasTasks = require('../../base/activeRecords/behaviors/HasTasks');

var _HasTasks2 = _interopRequireDefault(_HasTasks);

var _HasContacts = require('./behaviors/Lead/HasContacts');

var _HasContacts2 = _interopRequireDefault(_HasContacts);

var _HasCompany = require('../../base/activeRecords/behaviors/HasCompany');

var _HasCompany2 = _interopRequireDefault(_HasCompany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes Removable
 * @mixes HasNotes
 * @mixes HasTasks
 * @mixes HasContacts
 * @mixes HasCompany
 */
var Lead = function (_EntityActiveRecord) {
  _inherits(Lead, _EntityActiveRecord);

  function Lead() {
    _classCallCheck(this, Lead);

    return _possibleConstructorReturn(this, (Lead.__proto__ || Object.getPrototypeOf(Lead)).apply(this, arguments));
  }

  return Lead;
}(_EntityActiveRecord3.default);

Lead.behaviors = [new _Removable2.default(), new _HasNotes2.default(), new _HasTasks2.default(), new _HasContacts2.default(), new _HasCompany2.default()];
exports.default = Lead;