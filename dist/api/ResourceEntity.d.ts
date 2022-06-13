import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
import EventEmitter from "../common/EventEmitter";
/**
 * Основной класс сущностей
 * */
export default class ResourceEntity<T> extends EventEmitter implements IResourceEntity {
    [index: string]: any;
    protected readonly factory: T;
    required: string[];
    constructor(factory: T);
    /**
     * Возвращает все атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    getAttributes(): JSONObject;
    /**
     * Устанавливает атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    setAttributes(attributes?: JSONObject): void;
}
