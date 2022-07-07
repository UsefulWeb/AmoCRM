import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../interfaces/api";
import EventEmitter from "../common/EventEmitter";
import ResourceFactory from "./ResourceFactory";
import { JSONObject } from "../types";

/**
 * Основной класс сущностей
 * */
export default abstract class ResourceEntity
    <T extends IResourceFactory<IResourceEntity>>
    extends
        EventEmitter
    implements
        IResourceEntity
{
    public id?: number;
    public updated_at?: number;
    protected readonly factory: T;
    public required: string[] = [];

    constructor(factory: T) {
        super();
        this.factory = factory;
    }

    /**
     * Возвращает все атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract getAttributes(): IEntityAttributes;

    /**
     * Устанавливает атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract setAttributes(attributes?: IEntityAttributes): void;
}