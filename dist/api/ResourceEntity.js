"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = require("../common/EventEmitter");
/**
 * Основной класс сущностей
 * */
class ResourceEntity extends EventEmitter_1.EventEmitter {
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