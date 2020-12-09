'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Pipeline = require('../activeRecords/Pipeline');

var _Pipeline2 = _interopRequireDefault(_Pipeline);

var _PipelineResource = require('../resources/PipelineResource');

var _PipelineResource2 = _interopRequireDefault(_PipelineResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PipelineFactory = function (_EntityFactory) {
  _inherits(PipelineFactory, _EntityFactory);

  function PipelineFactory() {
    _classCallCheck(this, PipelineFactory);

    return _possibleConstructorReturn(this, (PipelineFactory.__proto__ || Object.getPrototypeOf(PipelineFactory)).apply(this, arguments));
  }

  return PipelineFactory;
}(_EntityFactory3.default);

PipelineFactory.entityClass = _Pipeline2.default;
PipelineFactory.resourceClass = _PipelineResource2.default;
exports.default = PipelineFactory;