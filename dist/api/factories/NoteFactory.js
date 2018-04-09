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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteFactory = function (_EntityFactory) {
  _inherits(NoteFactory, _EntityFactory);

  function NoteFactory() {
    _classCallCheck(this, NoteFactory);

    return _possibleConstructorReturn(this, (NoteFactory.__proto__ || Object.getPrototypeOf(NoteFactory)).apply(this, arguments));
  }

  return NoteFactory;
}(_EntityFactory3.default);

NoteFactory.entityClass = _Note2.default;
NoteFactory.resourceClass = _NoteResource2.default;
exports.default = NoteFactory;