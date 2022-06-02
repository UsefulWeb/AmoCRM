"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fillable() {
    return function (target, propertyKey) {
        if (!('fillable' in target)) {
            return;
        }
        target.fillable.push(propertyKey);
    };
}
exports.default = fillable;
//# sourceMappingURL=fillable.js.map