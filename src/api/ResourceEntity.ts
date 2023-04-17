import {IEmbedded, IEmbeddedEntity, IEntityAttributes, IResourceEntity, IResourceFactory} from "../interfaces/api";
import { EventEmitter } from "../common/EventEmitter";
import {EntityCriteriaBuilder, IEntityCriteriaBuilder} from "./activeRecords/common/EntityCriteriaBuilder";

/**
 * Основной класс сущностей
 * */
export default abstract class ResourceEntity
<T extends IResourceFactory<IResourceEntity<T>>>
    extends
        EventEmitter
    implements
        IResourceEntity<T> {
    public id?: number;
    public updated_at?: number;
    public _embedded?: object;
    public readonly criteriaBuilder: IEntityCriteriaBuilder;
    protected readonly factory: T;
    public required: string[] = [];

    constructor(factory: T) {
        super();
        this.factory = factory;
        this.criteriaBuilder = new EntityCriteriaBuilder(this);
    }

    getFactory() {
        return this.factory;
    }

    /**
     * @returns присутствует ли сущность на портале AmoCRM
     * */
    isNew() {
        return this.id === undefined;
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