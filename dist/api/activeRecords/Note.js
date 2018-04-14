'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityActiveRecord = require('../../base/activeRecords/EntityActiveRecord');

var _EntityActiveRecord2 = _interopRequireDefault(_EntityActiveRecord);

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

var _ContactFactory = require('../factories/ContactFactory');

var _ContactFactory2 = _interopRequireDefault(_ContactFactory);

var _LeadFactory = require('../factories/LeadFactory');

var _LeadFactory2 = _interopRequireDefault(_LeadFactory);

var _CompanyFactory = require('../factories/CompanyFactory');

var _CompanyFactory2 = _interopRequireDefault(_CompanyFactory);

var _TaskFactory = require('../factories/TaskFactory');

var _TaskFactory2 = _interopRequireDefault(_TaskFactory);

var _CustomerFactory = require('../factories/CustomerFactory');

var _CustomerFactory2 = _interopRequireDefault(_CustomerFactory);

var _NoteResource = require('../resources/NoteResource');

var _NoteResource2 = _interopRequireDefault(_NoteResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Note = function (_Entity) {
  _inherits(Note, _Entity);

  function Note() {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).apply(this, arguments));
  }

  _createClass(Note, [{
    key: 'getElementFactoryClassName',
    value: function getElementFactoryClassName() {
      switch (this._attributes.element_type) {
        case _ContactResource2.default.NOTE_ELEMENT_TYPE:
          return _ContactFactory2.default;
        case _LeadResource2.default.NOTE_ELEMENT_TYPE:
          return _LeadFactory2.default;
        case _CompanyResource2.default.NOTE_ELEMENT_TYPE:
          return _CompanyFactory2.default;
        case _TaskResource2.default.NOTE_ELEMENT_TYPE:
          return _TaskFactory2.default;
        case _CustomerResource2.default.NOTE_ELEMENT_TYPE:
          return _CustomerFactory2.default;
      }
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      var type = _NoteResource2.default.getElementType(this._attributes.element_type),
          id = this._attributes.id;

      if (this.isNew()) {
        throw new Error('EntityActiveRecord must exists for using EntityActiveRecord.fetch()!');
      }
      return this._resource.findById(id, type).then(function (response) {
        var attributes = response.getFirstItem();
        if (!attributes) {
          return false;
        }
        _this2._attributes = attributes;
        return _this2;
      });
    }
  }, {
    key: 'findById',
    value: function findById(id, type) {
      return this._resource.findById({ id: id, type: type });
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      if (this.isNew()) {
        throw new Error('note must exists!');
      }
      var factoryClassName = this.getElementFactoryClassName(),
          factory = factoryClassName.createFromResource(this._resource);

      return factory.findById(this._attributes.element_id);
    }
  }]);

  return Note;
}(_EntityActiveRecord2.default);

Note.behaviors = [];
exports.default = Note;