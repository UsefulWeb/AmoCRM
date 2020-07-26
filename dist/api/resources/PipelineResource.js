'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('../../routes/v2');

var _v2 = _interopRequireDefault(_v);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

var _Findable = require('../../base/resources/behaviors/Findable');

var _Findable2 = _interopRequireDefault(_Findable);

var _PipelineResponseHandler = require('../responseHandlers/PipelineResponseHandler');

var _PipelineResponseHandler2 = _interopRequireDefault(_PipelineResponseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @mixes Findable
 */
var PipelineResource = function (_EntityResource) {
  _inherits(PipelineResource, _EntityResource);

  function PipelineResource() {
    _classCallCheck(this, PipelineResource);

    return _possibleConstructorReturn(this, (PipelineResource.__proto__ || Object.getPrototypeOf(PipelineResource)).apply(this, arguments));
  }

  _createClass(PipelineResource, [{
    key: 'findById',
    value: function findById(id) {
      var _this2 = this;

      return this.find().then(function (response) {
        return response.getItems();
      }).then(function (items) {
        return items.filter(function (item) {
          return id === item.id;
        });
      }).then(function (response) {
        return _this2.handleResponse(response);
      });
    }
  }, {
    key: 'insert',
    value: function insert() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _constructor = this.constructor,
          insertPath = _constructor.insertPath,
          path = _constructor.path;

      return this.request('POST', insertPath || path, {
        request: {
          pipelines: {
            add: data
          }
        }
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _constructor2 = this.constructor,
          path = _constructor2.path,
          updatePath = _constructor2.updatePath,
          pipelinesData = data.reduce(function (target, item) {
        target[item.id] = item;
        return target;
      }, {});


      return this.request('POST', updatePath || path, {
        request: {
          pipelines: {
            update: pipelinesData
          }
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var deletePath = this.constructor.deletePath;

      return this.request('POST', deletePath, {
        request: {
          id: ids
        }
      });
    }
  }]);

  return PipelineResource;
}(_EntityResource3.default);

PipelineResource.path = _v2.default.entities.pipelines.path;
PipelineResource.getPath = _v2.default.entities.pipelines.getPath;
PipelineResource.deletePath = _v2.default.entities.pipelines.deletePath;
PipelineResource.responseHandlerClass = _PipelineResponseHandler2.default;
PipelineResource.behaviors = [new _Findable2.default()];
exports.default = PipelineResource;