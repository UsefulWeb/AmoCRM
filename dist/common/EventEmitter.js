"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("events");
var EventEmitter = /** @class */ (function (_super) {
    tslib_1.__extends(EventEmitter, _super);
    function EventEmitter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subscribers = [];
        return _this;
    }
    EventEmitter.prototype.subscribe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    EventEmitter.prototype.unsubsscribe = function (subscriber) {
        this.subscribers = this.subscribers.filter(function (s) { return s !== subscriber; });
    };
    EventEmitter.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = _super.prototype.emit.apply(this, tslib_1.__spreadArray([eventName], args, false));
        var context = args[0];
        if (context instanceof EventEmitter) {
            return result;
        }
        var name = this.constructor.name;
        var id = name[0].toLowerCase() + name.substring(1);
        var subscriberEventName = id + ':' + eventName.toString();
        this.subscribers.forEach(function (subscriber) { return subscriber.emit.apply(subscriber, tslib_1.__spreadArray([subscriberEventName, _this], args, false)); });
        return result;
    };
    return EventEmitter;
}(events_1.EventEmitter));
exports.default = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map