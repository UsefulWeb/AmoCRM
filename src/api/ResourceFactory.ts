import { ICollectionResponse, IEntityAttributes, IResourceEntity, IResourceFactory } from "../interfaces/api";
import { IClientRequest } from "../common/ClientRequest";
import ResourceEntity from "./ResourceEntity";
import { EventEmitter } from "../common/EventEmitter";
import {TConstructor, TFactoryConstructor} from "../types";
import { IClient } from "../Client";
import {FactoryCriteriaBuilder, IFactoryCriteriaBuilder} from "./factories/common/FactoryCriteriaBuilder";
import {ObjectKey} from "../interfaces/common";
import {IFactoryConstructors} from "./factories";

/**
 * Основной класс фабрики сущностей. Класс-фабрика служит для создания
 * новых сущностей. Например, {@link LeadFactory} отвечает за {@link Lead}
 * */
export default abstract class ResourceFactory<T extends IResourceEntity<IResourceFactory<T>>>
    extends EventEmitter
    implements IResourceFactory<T>
{
    protected readonly request: IClientRequest;
    protected readonly client: IClient;
    public readonly criteriaBuilder: IFactoryCriteriaBuilder;

    constructor(client: IClient) {
        super();
        this.client = client;
        this.request = client.getRequest();
        this.criteriaBuilder = new FactoryCriteriaBuilder(this);
    }

    abstract getBaseUrl(): string;
    abstract getEmbeddedKey(): ObjectKey<IFactoryConstructors>;

    getClient() {
        return this.client;
    }

    getEmbedded<A extends IEntityAttributes>(data: ICollectionResponse<A>): A[] {
        const key = this.getEmbeddedKey();
        const { _embedded = {}} = data;
        return _embedded[key] || [];
    }

    /**
     * @returns новый экземпляр сущности. Например, {@link LeadFactory} вернёт {@link Lead}
     * */
    createEntity(): T {
        const className = this.getEntityClass();
        return new className(this);
    }

    abstract getEntityClass(): TConstructor<T>;

    /**
     * Возвращает ссылку на объект запроса
     * */
    getRequest(): IClientRequest {
        return this.request;
    }
    
    /**
     * Форматирует адрес на основе baseUrl фабрики
     * */
    getUrl(path= ''): string {
        return this.getBaseUrl() + path;
    }

    /**
     * Создаёт сущность и заполняет её атрибутами, которые
     * будут синхронизироваться с порталом AmoCRM
     * */
    from(attributes?: object): T {
        const instance = this.createEntity();
        instance.setAttributes(attributes);
        return instance;
    }

    /**
     * Приводит все переданные объекты-сущности в массиве
     * criteriaData к их объекту-атрибутов (ключ-значение)
     * @param criteriaData массив plain JavaScript-объектов или сущностей
     * @returns массив plain JavaScript-объектов
     * */
    getEntityCriteria(criteriaData: (object)[]): IEntityAttributes[] {
        return criteriaData.map(criteria => {
            if (criteria instanceof ResourceEntity) {
                return criteria.getAttributes();
            }
            return criteria;
        });
    }
}