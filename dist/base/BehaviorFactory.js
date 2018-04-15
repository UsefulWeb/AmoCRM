'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BehaviorFactory = function () {
  function BehaviorFactory() {
    _classCallCheck(this, BehaviorFactory);
  }

  _createClass(BehaviorFactory, null, [{
    key: 'assignBehaviors',
    value: function assignBehaviors(target, behaviors) {
      var info = this.mergeBehaviorsInfo.apply(this, _toConsumableArray(behaviors));
      Object.assign(target, info.prototypeProperties);
      Object.assign(target, info.properties);
      Object.defineProperties(target, info.descriptors);
    }
  }, {
    key: 'mergeBehaviorsInfo',
    value: function mergeBehaviorsInfo() {
      var _this = this;

      var getProp = function getProp(prop) {
        return function (obj) {
          return obj[prop];
        };
      },
          getObjectsProps = function getObjectsProps(objs, prop) {
        return objs.map(getProp(prop));
      },
          mergeByProp = function mergeByProp(prop) {
        for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          objs[_key2 - 1] = arguments[_key2];
        }

        return Object.assign.apply(Object, _toConsumableArray(getObjectsProps(objs, prop)));
      },
          info = {
        prototypeProperties: {},
        descriptors: {},
        properties: {}
      };

      for (var _len = arguments.length, behaviors = Array(_len), _key = 0; _key < _len; _key++) {
        behaviors[_key] = arguments[_key];
      }

      return behaviors.reduce(function (target, behavior) {
        var info = _this.getBehaviorInfo(behavior);
        mergeByProp('prototypeProperties', target, info);
        mergeByProp('descriptors', target, info);
        mergeByProp('properties', target, info);
        return target;
      }, info);
    }
  }, {
    key: 'getBehaviorInfo',
    value: function getBehaviorInfo(behavior) {
      return {
        prototypeProperties: this.getBehaviorPrototypeProperties(behavior),
        descriptors: this.getBehaviorDescriptors(behavior),
        properties: this.getBehaviorProperties(behavior)
      };
    }
  }, {
    key: 'getBehaviorProperties',
    value: function getBehaviorProperties(behavior) {
      return Object.keys(behavior).reduce(function (target, property) {
        target[property] = behavior[property];
        return target;
      }, {});
    }
  }, {
    key: 'getBehaviorPrototypeProperties',
    value: function getBehaviorPrototypeProperties(behavior) {
      var proto = Object.getPrototypeOf(behavior),
          isNotConstructor = function isNotConstructor(property) {
        return property !== 'constructor';
      },
          data = {},
          properties = Object.getOwnPropertyNames(proto);

      properties.filter(function (property) {
        return isNotConstructor(property);
      }).forEach(function (property) {
        data[property] = behavior[property];
      });

      return data;
    }
  }, {
    key: 'getBehaviorDescriptors',
    value: function getBehaviorDescriptors(behavior) {
      var proto = Object.getPrototypeOf(behavior),
          descriptors = Object.getOwnPropertyDescriptors(proto),
          data = {};

      return Object.keys(descriptors).reduce(function (target, name) {
        var descriptor = descriptors[name];
        if (descriptor.get || descriptor.set) {
          target[name] = descriptor;
        }
        return target;
      }, data);
    }
  }]);

  return BehaviorFactory;
}();

exports.default = BehaviorFactory;