'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RemoteResource2 = require('./RemoteResource');

var _RemoteResource3 = _interopRequireDefault(_RemoteResource2);

var _EntityResponseHandler = require('../responseHandlers/EntityResponseHandler');

var _EntityResponseHandler2 = _interopRequireDefault(_EntityResponseHandler);

var _v = require('../../routes/v2');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityResource = function (_RemoteResource) {
  _inherits(EntityResource, _RemoteResource);

  function EntityResource() {
    _classCallCheck(this, EntityResource);

    return _possibleConstructorReturn(this, (EntityResource.__proto__ || Object.getPrototypeOf(EntityResource)).apply(this, arguments));
  }

  _createClass(EntityResource, [{
    key: 'findById',
    value: function findById(id) {
      return this.find({ id: id });
    }
  }, {
    key: 'find',
    value: function find() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _constructor = this.constructor,
          path = _constructor.path,
          getPath = _constructor.getPath;

      return this.request('GET', getPath || path, query);
    }
  }, {
    key: 'insert',
    value: function insert() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _constructor2 = this.constructor,
          insertPath = _constructor2.insertPath,
          path = _constructor2.path;

      return this.request('POST', insertPath || path, {
        add: data
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _constructor3 = this.constructor,
          path = _constructor3.path,
          updatePath = _constructor3.updatePath;

      return this.request('POST', updatePath || path, {
        update: data
      });
    }
  }, {
    key: 'multiactions',
    value: function multiactions(ids) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var multiaction_type = arguments[2];
      var _constructor4 = this.constructor,
          multiactionsPath = _constructor4.multiactionsPath,
          ENTITY_TYPE = _constructor4.ENTITY_TYPE;

      return this.request('POST', multiactionsPath, {
        request: {
          multiactions: {
            add: [{
              entity_type: ENTITY_TYPE,
              multiaction_type: multiaction_type,
              data: data,
              ids: ids
            }]
          }
        }
      }, {
        formData: true
      });
    }
  }]);

  return EntityResource;
}(_RemoteResource3.default);

EntityResource.multiactionsPath = _v2.default.multiactions;
EntityResource.responseHandlerClass = _EntityResponseHandler2.default;
EntityResource.DELETE_MULTIACTION_TYPE = 4;
exports.default = EntityResource;