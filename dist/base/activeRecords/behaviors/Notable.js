"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factories = require("../../../api/factories");

var _factories2 = _interopRequireDefault(_factories);

var _NoteResource = require("../../../api/resources/NoteResource");

var _NoteResource2 = _interopRequireDefault(_NoteResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notable = function () {
  function Notable() {
    _classCallCheck(this, Notable);
  }

  _createClass(Notable, [{
    key: "addNote",
    value: function addNote(note) {
      if (!note.isNew()) {
        throw new Error('note must not exists!');
      }
      var NOTE_ELEMENT_TYPE = this._resource.constructor.NOTE_ELEMENT_TYPE;

      note.element_type = NOTE_ELEMENT_TYPE;
      note.element_id = this._attributes.id;
      return note.save();
    }
  }, {
    key: "getNotes",
    value: function getNotes(params) {
      var factory = _factories2.default.Note,
          resource = this._resource,
          factoryInstance = factory.createFromResource(resource),
          resourceConstructor = resource.constructor,
          NOTE_ELEMENT_TYPE = resourceConstructor.NOTE_ELEMENT_TYPE,
          type = _NoteResource2.default.getElementType(NOTE_ELEMENT_TYPE),
          criteria = _extends({}, params, {
        type: type,
        element_id: this._attributes.id
      });


      return factoryInstance.find(criteria);
    }
  }, {
    key: "notes",
    get: function get() {
      var _this = this;

      return {
        add: function add(note) {
          return _this.addNote(note);
        },
        get: function get(params) {
          return _this.getNotes(params);
        }
      };
    }
  }]);

  return Notable;
}();

exports.default = Notable;