"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fillable_1 = require("./activeRecords/decorators/fillable");
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
    /**
     * Возвращает все атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    getAttributes() {
        return (0, fillable_1.getFillable)(this)
            .reduce((target, key) => {
            if (key in this) {
                target[key] = this[key];
            }
            return target;
        }, {});
    }
    /**
     * Устанавливает атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    setAttributes(attributes) {
        if (!attributes) {
            return;
        }
        for (const attr in attributes) {
            if ((0, fillable_1.isFillable)(this, attr)) {
                this[attr] = attributes[attr];
            }
        }
    }
}
exports.default = ResourceEntity;
//# sourceMappingURL=ResourceEntity.js.map