'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseActiveRecord = require('./BaseActiveRecord');

var _BaseActiveRecord2 = _interopRequireDefault(_BaseActiveRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityActiveRecord = function (_ActiveRecord) {
  _inherits(EntityActiveRecord, _ActiveRecord);

  function EntityActiveRecord() {
    _classCallCheck(this, EntityActiveRecord);

    return _possibleConstructorReturn(this, (EntityActiveRecord.__proto__ || Object.getPrototypeOf(EntityActiveRecord)).apply(this, arguments));
  }

  _createClass(EntityActiveRecord, [{
    key: 'save',
    value: function save() {
      return this.isNew() ? this.insert() : this.update();
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      if (this.isNew()) {
        throw new Error('EntityActiveRecord must exists for using EntityActiveRecord.fetch()!');
      }
      return this._resource.findById(this._attributes.id).then(function (response) {
        return _this2.afterFetch(response);
      });
    }
  }, {
    key: 'afterFetch',
    value: function afterFetch(response) {
      var attributes = response.getFirstItem();
      if (!attributes) {
        return false;
      }
      this._attributes = attributes;
      return this;
    }
  }, {
    key: 'exists',
    value: function exists() {
      return this.fetch().then(function (response) {
        return response !== false;
      });
    }
  }, {
    key: 'insert',
    value: function insert() {
      var _this3 = this;

      if (!this.isNew()) {
        throw new Error('EntityActiveRecord must not exists for using EntityActiveRecord.insert()!');
      }
      return this._resource.insert([this._attributes]).then(function (response) {
        return _this3.afterInsert(response);
      });
    }
  }, {
    key: 'afterInsert',
    value: function afterInsert(response) {
      var attributes = response.getFirstItem() || {};
      this._attributes.id = attributes.id;
      return this;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      if (this.isNew()) {
        throw new Error('EntityActiveRecord must exists for using EntityActiveRecord.update()!');
      }
      return this._resource.update([this._attributes]).then(function () {
        return _this4;
      });
    }
  }]);

  return EntityActiveRecord;
}(_BaseActiveRecord2.default);

exports.default = EntityActiveRecord;