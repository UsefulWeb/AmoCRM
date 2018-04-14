'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Note = require('../activeRecords/Note');

var _Note2 = _interopRequireDefault(_Note);

var _NoteResource = require('../resources/NoteResource');

var _NoteResource2 = _interopRequireDefault(_NoteResource);

var _Removable = require('../../base/factories/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _ContactResource = require('../resources/ContactResource');

var _ContactResource2 = _interopRequireDefault(_ContactResource);

var _LeadResource = require('../resources/LeadResource');

var _LeadResource2 = _interopRequireDefault(_LeadResource);

var _CompanyResource = require('../resources/CompanyResource');

var _CompanyResource2 = _interopRequireDefault(_CompanyResource);

var _TaskResource = require('../resources/TaskResource');

var _TaskResource2 = _interopRequireDefault(_TaskResource);

var _CustomerResource = require('../resources/CustomerResource');

var _CustomerResource2 = _interopRequireDefault(_CustomerResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteFactory = function (_EntityFactory) {
  _inherits(NoteFactory, _EntityFactory);

  function NoteFactory() {
    var _ref;

    _classCallCheck(this, NoteFactory);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = NoteFactory.__proto__ || Object.getPrototypeOf(NoteFactory)).call.apply(_ref, [this].concat(args)));

    _this.ELEMENT_TYPE = {
      CONTACT: _ContactResource2.default.NOTE_ELEMENT_TYPE,
      LEAD: _LeadResource2.default.NOTE_ELEMENT_TYPE,
      COMPANY: _CompanyResource2.default.NOTE_ELEMENT_TYPE,
      TASK: _TaskResource2.default.NOTE_ELEMENT_TYPE,
      CUSTOMER: _CustomerResource2.default.NOTE_ELEMENT_TYPE
    };

    _this.NOTE_TYPE = {
      DEAL_CREATED: 1,
      CONTACT_CREATED: 2,
      DEAL_STATUS_CHANGED: 3,
      COMMON: 4,
      CALL_IN: 10,
      CALL_OUT: 11,
      COMPANY_CREATED: 12,
      TASK_RESULT: 13,
      SYSTEM: 25,
      SMS_IN: 102,
      SMS_OUT: 103
    };

    _this.CALL_STATUS = {
      VOICE_MESSAGE_CREATED: 1,
      CALL_LATER: 2,
      NOT_AVAILABLE: 3,
      SUCCESSFUL_CALL: 4,
      WRONG_NUMBER: 5,
      DID_NOT_GET_THROUGH: 6,
      BUSY: 7
    };
    return _this;
  }

  return NoteFactory;
}(_EntityFactory3.default);

NoteFactory.entityClass = _Note2.default;
NoteFactory.resourceClass = _NoteResource2.default;
NoteFactory.behaviors = [new _Removable2.default()];
exports.default = NoteFactory;