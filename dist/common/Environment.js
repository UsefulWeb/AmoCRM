"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environment = /** @class */ (function () {
    function Environment(options) {
        this.options = options;
    }
    Environment.prototype.get = function (path, defaultValue) {
        if (!this.options) {
            return defaultValue;
        }
        var value = this.options;
        if (!path) {
            return value;
        }
        var parts = path.split('.');
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var key = parts_1[_i];
            if (!value) {
                return defaultValue;
            }
            value = value[key];
        }
        if (value === undefined) {
            return defaultValue;
        }
        return value;
    };
    Environment.prototype.set = function (path, value) {
        if (!this.options) {
            throw new Error('NO_ENVIRONMENT_OPTIONS');
        }
        var handler = this.options;
        var parts = path.split('.');
        if (parts.length === 0) {
            throw new Error('PATH_IS_EMPTY');
        }
        for (var i = 0; i < parts.length - 1; i++) {
            var key = parts[i];
            if (!handler[key]) {
                handler[key] = {};
            }
            handler = handler[key];
        }
        var lastKey = parts.pop();
        if (!lastKey) {
            throw new Error('INVALID_PATH');
        }
        handler[lastKey] = value;
    };
    Environment.prototype.exists = function (path) {
        return this.get(path) !== undefined;
    };
    return Environment;
}());
exports.default = Environment;
//# sourceMappingURL=Environment.js.map