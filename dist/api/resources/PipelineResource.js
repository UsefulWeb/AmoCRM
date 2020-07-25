'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('../../routes/v2');

var _v2 = _interopRequireDefault(_v);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PipelineResource = function (_EntityResource) {
  _inherits(PipelineResource, _EntityResource);

  function PipelineResource() {
    _classCallCheck(this, PipelineResource);

    return _possibleConstructorReturn(this, (PipelineResource.__proto__ || Object.getPrototypeOf(PipelineResource)).apply(this, arguments));
  }

  _createClass(PipelineResource, [{
    key: 'remove',
    value: function remove(id) {
      var deletePath = this.constructor.deletePath;

      return this.request('POST', deletePath, { id: id });
    }
  }]);

  return PipelineResource;
}(_EntityResource3.default);

PipelineResource.path = _v2.default.entities.pipelines.path;
PipelineResource.deletePath = _v2.default.entities.pipelines.deletePath;
exports.default = PipelineResource;