"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceFactory2 = require("./ResourceFactory");

var _ResourceFactory3 = _interopRequireDefault(_ResourceFactory2);

var _EntityProxyHandler = require("../EntityProxyHandler");

var _EntityProxyHandler2 = _interopRequireDefault(_EntityProxyHandler);

var _EntityTarget = require("../EntityTarget");

var _EntityTarget2 = _interopRequireDefault(_EntityTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityFactory = function (_ResourceFactory) {
  _inherits(EntityFactory, _ResourceFactory);

  function EntityFactory() {
    _classCallCheck(this, EntityFactory);

    return _possibleConstructorReturn(this, (EntityFactory.__proto__ || Object.getPrototypeOf(EntityFactory)).apply(this, arguments));
  }

  _createClass(EntityFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _constructor = this.constructor,
          entityClass = _constructor.entityClass,
          entityHandlerClass = _constructor.entityHandlerClass,
          entityTargetClass = _constructor.entityTargetClass,
          entity = new entityClass(this._resource, attributes),
          handler = new entityHandlerClass(entity);

      return new Proxy(new entityTargetClass(entityClass.name), handler);
    }
  }, {
    key: "of",
    value: function of() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.create(attributes);
    }
  }, {
    key: "findById",
    value: function findById(id) {
      var _this2 = this;

      return this._resource.findById(id).then(function (response) {
        var attributes = response.getFirstItem();
        return _this2.create(attributes);
      });
    }
  }, {
    key: "find",
    value: function find(query) {
      var _this3 = this;

      return this._resource.find(query).then(function (response) {
        var items = response.getItems();
        return items.map(function (attributes) {
          return _this3.create(attributes);
        });
      });
    }
  }, {
    key: "insert",
    value: function insert(data) {
      return this._resource.insert(data);
    }
  }, {
    key: "update",
    value: function update(data) {
      return this._resource.update(data);
    }
  }, {
    key: "remove",
    value: function remove(data) {
      return this._resource.remove(data);
    }
  }]);

  return EntityFactory;
}(_ResourceFactory3.default);

EntityFactory.entityHandlerClass = _EntityProxyHandler2.default;
EntityFactory.entityTargetClass = _EntityTarget2.default;
exports.default = EntityFactory;