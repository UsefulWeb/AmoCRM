"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFillable = exports.fillable = void 0;
var metadataKey = Symbol('fillable');
function fillable() {
    return Reflect.metadata(metadataKey, true);
}
exports.fillable = fillable;
function isFillable(target, propertyKey) {
    return Reflect.getMetadata(metadataKey, target, propertyKey) || false;
}
exports.isFillable = isFillable;
//# sourceMappingURL=fillable.js.map