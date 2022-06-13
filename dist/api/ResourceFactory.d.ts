import { IResourceFactory } from "../interfaces/api";
import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import ResourceEntity from "./ResourceEntity";
import EventEmitter from "../common/EventEmitter";
/**
 * Основной класс фабрики сущностей. Класс-фабрика служит для создания
 * новых сущностей. Например, {@link LeadFactory} отвечает за {@link Lead}
 * */
export default abstract class ResourceFactory<T extends ResourceEntity<ResourceFactory<T>>> extends EventEmitter implements IResourceFactory<T> {
    protected readonly request: ClientRequest;
    constructor(request: ClientRequest);
    /**
     * @returns новый экземпляр сущности. Например, {@link LeadFactory} вернёт {@link Lead}
     * */
    abstract createEntity(): T;
    /**
     * Создаёт сущность и заполняет её атрибутами, которые
     * будут синхронизироваться с порталом AmoCRM
     * */
    from(attributes?: JSONObject): T;
    /**
     * Приводит все переданные объекты-сущности в массиве
     * criteriaData к их объекту-атрибутов (ключ-значение)
     * @param criteriaData массив plain JavaScript-объектов или сущностей
     * @returns массив plain JavaScript-объектов
     * */
    protected getEntityCriteria(criteriaData: any[]): JSONObject[];
}
