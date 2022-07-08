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
    getFactory() {
        return this.factory;
    }
    /**
     * @returns присутствует ли сущность на портале AmoCRM
     * */
    isNew() {
        return this.id !== undefined;
    }
}
exports.default = ResourceEntity;
//# sourceMappingURL=ResourceEntity.js.map