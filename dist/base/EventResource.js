"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventResource = function () {
  function EventResource() {
    _classCallCheck(this, EventResource);

    this._events = {};
  }

  _createClass(EventResource, [{
    key: "proxyEventHandlers",
    value: function proxyEventHandlers(prefix, events, target) {
      var _this = this;

      events.forEach(function (event) {
        return target.on(event, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var selfEvent = prefix + ":" + event;
          _this.triggerEvent.apply(_this, [selfEvent].concat(args));
        });
      });
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      if (!this._events[event]) {
        this._events[event] = [];
      }

      this._events[event].push(handler);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      if (!event) {
        this._events = [];
        return this;
      }

      if (!handler) {
        delete this._events[event];
      }

      var index = this._events[event].findIndex(handler);

      if (!index) {
        return this;
      }

      this._events[event].splice(index, 1);
      return this;
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(event) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!this._events[event]) {
        return;
      }

      this._events[event].forEach(function (handler) {
        return handler.apply(undefined, args);
      });
    }
  }]);

  return EventResource;
}();

module.exports = EventResource;