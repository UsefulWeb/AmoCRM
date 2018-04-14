'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _this.ELEMENT_TYPE = _NoteResource2.default.ELEMENT_TYPES;

    _this.NOTE_TYPE = _NoteResource2.default.NOTE_TYPES;

    _this.CALL_STATUS = _NoteResource2.default.CALL_STATUSES;
    return _this;
  }

  _createClass(NoteFactory, [{
    key: 'findById',
    value: function findById(id, type) {
      var _this2 = this;

      return this._resource.findById(id, type).then(function (response) {
        var attributes = response.getFirstItem();
        if (!attributes) {
          return;
        }
        return _this2.create(attributes);
      });
    }
  }]);

  return NoteFactory;
}(_EntityFactory3.default);

NoteFactory.entityClass = _Note2.default;
NoteFactory.resourceClass = _NoteResource2.default;
NoteFactory.behaviors = [new _Removable2.default()];
exports.default = NoteFactory;