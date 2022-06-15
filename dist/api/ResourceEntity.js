"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EventEmitter_1 = tslib_1.__importDefault(require("../common/EventEmitter"));
/**
 * Основной класс сущностей
 * */
class ResourceEntity extends EventEmitter_1.default {
    constructor(factory) {
        super();
        this.required = [];
        this.factory = factory;
    }
}
exports.default = ResourceEntity;
//# sourceMappingURL=ResourceEntity.js.map