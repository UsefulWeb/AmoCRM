import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../interfaces/api";
import EventEmitter from "../common/EventEmitter";
/**
 * Основной класс сущностей
 * */
export default abstract class ResourceEntity<T extends IResourceFactory<IResourceEntity>> extends EventEmitter implements IResourceEntity {
    id?: number;
    updated_at?: number;
    protected readonly factory: T;
    required: string[];
    constructor(factory: T);
    /**
     * Возвращает все атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract getAttributes(): IEntityAttributes;
    /**
     * Устанавливает атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract setAttributes(attributes?: IEntityAttributes): void;
}
