"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFillable = exports.getFillable = exports.fillable = void 0;
const metadataKey = Symbol('fillable');
/**
 * Помечает свойство сущности для синхронизации
 * */
function fillable() {
    return (target, propertyKey) => {
        const attributes = Reflect.getMetadata(metadataKey, target) || [];
        attributes.push(propertyKey);
        Reflect.defineMetadata(metadataKey, attributes, target);
        Reflect.defineMetadata(metadataKey, true, target, propertyKey);
    };
}
exports.fillable = fillable;
/**
 * @returns массив полей сущности, которые синхронизируются с порталом
 * */
function getFillable(target) {
    return Reflect.getMetadata(metadataKey, target) || [];
}
exports.getFillable = getFillable;
/**
 * @returns синхронизируется ли поле сущности c порталом
 * */
function isFillable(target, propertyKey) {
    return Reflect.getMetadata(metadataKey, target, propertyKey) || false;
}
exports.isFillable = isFillable;
//# sourceMappingURL=fillable.js.map