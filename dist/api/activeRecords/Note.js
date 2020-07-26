'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityActiveRecord2 = require('../../base/activeRecords/EntityActiveRecord');

var _EntityActiveRecord3 = _interopRequireDefault(_EntityActiveRecord2);

var _NoteResource = require('../resources/NoteResource');

var _NoteResource2 = _interopRequireDefault(_NoteResource);

var _HasElementByField = require('../../base/activeRecords/behaviors/HasElementByField');

var _HasElementByField2 = _interopRequireDefault(_HasElementByField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes HasElementByField
 */
var Note = function (_EntityActiveRecord) {
  _inherits(Note, _EntityActiveRecord);

  function Note() {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).apply(this, arguments));
  }

  _createClass(Note, [{
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      var type = _NoteResource2.default.getElementType(this._attributes.element_type),
          id = this._attributes.id;

      if (this.isNew()) {
        throw new Error('EntityActiveRecord must exists for using EntityActiveRecord.fetch()!');
      }
      return this._resource.findById(id, type).then(function (response) {
        return _this2.afterFetch(response);
      });
    }
  }, {
    key: 'findById',
    value: function findById(id, type) {
      return this._resource.findById(id, type);
    }
  }]);

  return Note;
}(_EntityActiveRecord3.default);

Note.behaviors = [new _HasElementByField2.default('NOTE_ELEMENT_TYPE')];
exports.default = Note;