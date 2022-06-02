"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function required() {
    return function (target, propertyKey) {
        target.required.push(propertyKey);
    };
}
exports.default = required;
//# sourceMappingURL=required.js.map