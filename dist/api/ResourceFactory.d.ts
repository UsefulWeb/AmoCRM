import { ICollectionResponse, IEntityAttributes, IResourceEntity, IResourceFactory } from "../interfaces/api";
import { IClientRequest } from "../common/ClientRequest";
import { EventEmitter } from "../common/EventEmitter";
import { TConstructor } from "../types";
/**
 * Основной класс фабрики сущностей. Класс-фабрика служит для создания
 * новых сущностей. Например, {@link LeadFactory} отвечает за {@link Lead}
 * */
export default abstract class ResourceFactory<T extends IResourceEntity<IResourceFactory<T>>> extends EventEmitter implements IResourceFactory<T> {
    protected readonly request: IClientRequest;
    constructor(request: IClientRequest);
    abstract getBaseUrl(): string;
    abstract getEmbeddedKey(): string;
    getEmbedded<A extends IEntityAttributes>(data: ICollectionResponse<A>): A[];
    /**
     * @returns новый экземпляр сущности. Например, {@link LeadFactory} вернёт {@link Lead}
     * */
    createEntity(): T;
    abstract getEntityClass(): TConstructor<T>;
    /**
     * Возвращает ссылку на объект запроса
     * */
    getRequest(): IClientRequest;
    /**
     * Форматирует адрес на основе baseUrl фабрики
     * */
    getUrl(path?: string): string;
    /**
     * Создаёт сущность и заполняет её атрибутами, которые
     * будут синхронизироваться с порталом AmoCRM
     * */
    from(attributes?: object): T;
    /**
     * Приводит все переданные объекты-сущности в массиве
     * criteriaData к их объекту-атрибутов (ключ-значение)
     * @param criteriaData массив plain JavaScript-объектов или сущностей
     * @returns массив plain JavaScript-объектов
     * */
    getEntityCriteria(criteriaData: (object)[]): IEntityAttributes[];
}
