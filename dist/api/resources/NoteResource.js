'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

var _HasMultiactions = require('../../base/resources/behaviors/HasMultiactions');

var _HasMultiactions2 = _interopRequireDefault(_HasMultiactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteResource = function (_EntityResource) {
  _inherits(NoteResource, _EntityResource);

  function NoteResource() {
    _classCallCheck(this, NoteResource);

    return _possibleConstructorReturn(this, (NoteResource.__proto__ || Object.getPrototypeOf(NoteResource)).apply(this, arguments));
  }

  _createClass(NoteResource, [{
    key: 'findById',
    value: function findById(id, type) {
      return _get(NoteResource.prototype.__proto__ || Object.getPrototypeOf(NoteResource.prototype), 'find', this).call(this, { id: id, type: type });
    }
  }], [{
    key: 'getElementType',
    value: function getElementType(value) {
      var types = this.ELEMENT_TYPES,
          compareKey = function compareKey(key) {
        return types[key] === value;
      },
          type = Object.keys(types).filter(compareKey)[0];

      return type.toLowerCase();
    }
  }]);

  return NoteResource;
}(_EntityResource3.default);

NoteResource.path = _apiUrls2.default.entities.notes.path;
NoteResource.deletePath = _apiUrls2.default.entities.notes.deletePath;
NoteResource.ENTITY_TYPE = 2;
NoteResource.behaviors = [new _HasMultiactions2.default()];
NoteResource.ELEMENT_TYPES = {
  CONTACT: 1,
  LEAD: 2,
  COMPANY: 3,
  TASK: 4,
  CUSTOMER: 5
};
NoteResource.NOTE_TYPES = {
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
NoteResource.CALL_STATUSES = {
  VOICE_MESSAGE_CREATED: 1,
  CALL_LATER: 2,
  NOT_AVAILABLE: 3,
  SUCCESSFUL_CALL: 4,
  WRONG_NUMBER: 5,
  DID_NOT_GET_THROUGH: 6,
  BUSY: 7
};
exports.default = NoteResource;