'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filterable = function () {
  function Filterable() {
    _classCallCheck(this, Filterable);
  }

  _createClass(Filterable, [{
    key: 'filterByTerm',
    value: function filterByTerm(term) {
      var _this = this;

      var criteria = {
        term: term
      };
      return this._resource.filter(criteria).then(function (response) {
        return _this.afterFilter(response);
      });
    }
  }, {
    key: 'filter',
    value: function filter(query) {
      var _this2 = this;

      var criteria = {
        filter: query,
        useFilter: 'y'
      };
      return this._resource.filter(criteria).then(function (response) {
        return _this2.afterFilter(response);
      });
    }
  }, {
    key: 'afterFilter',
    value: function afterFilter(response) {
      return response.getItems();
    }
  }, {
    key: 'filterByAttributes',
    value: function filterByAttributes(query) {
      var _this3 = this;

      return this.filter(query).then(function (response) {
        return _this3.afterFilterByAttributes(response);
      });
    }
  }, {
    key: 'afterFilterByAttributes',
    value: function afterFilterByAttributes(items) {
      var _this4 = this;

      return items.map(function (item) {
        var attributes = {
          id: item.id,
          name: item.name.text
        };
        var entity = _this4.of(attributes);

        entity.markAsIncomplete(false);

        return entity;
      });
    }
  }, {
    key: 'filterByCustomFields',
    value: function filterByCustomFields(query) {
      var _this5 = this;

      return this.filter({
        filter: {
          cf: query
        }
      }).then(function (response) {
        return _this5.afterFilterByAttributes(response);
      });
    }
  }, {
    key: 'filterByCustomField',
    value: function filterByCustomField(id, value) {
      return this.filterByCustomFields(_defineProperty({}, id, value));
    }
  }, {
    key: 'findByTerm',
    value: function findByTerm(term) {
      var _this6 = this;

      return this.filterByTerm(term).then(function (items) {
        return _this6.afterFindByAttributes(items);
      });
    }
  }, {
    key: 'findByAttributes',
    value: function findByAttributes(query) {
      var _this7 = this;

      return this.filterByAttributes(query).then(function (items) {
        return _this7.afterFindByAttributes(items);
      });
    }
  }, {
    key: 'afterFindByAttributes',
    value: function afterFindByAttributes(items) {
      var ids = items.map(function (item) {
        return item.id;
      });
      return this.findById(ids);
    }
  }, {
    key: 'findByCustomFields',
    value: function findByCustomFields(query) {
      var _this8 = this;

      return this.filterByCustomFields(query).then(function (items) {
        return _this8.afterFindByAttributes(items);
      });
    }
  }, {
    key: 'findByCustomField',
    value: function findByCustomField(id, value) {
      var _this9 = this;

      return this.filterByCustomField(id, value).then(function (items) {
        return _this9.afterFindByAttributes(items);
      });
    }
  }]);

  return Filterable;
}();

exports.default = Filterable;