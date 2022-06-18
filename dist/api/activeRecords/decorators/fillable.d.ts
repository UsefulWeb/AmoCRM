/**
 * Декоратор, помечающий свойство сущности как поле для синхронизации с AmoCRM
 * Только свойства, помеченные как @fillable будут
 * отправляться при вызове create, update, fetch методов экземпляра сущности
 * */
import ResourceEntity from "../../ResourceEntity";
import ResourceFactory from "../../ResourceFactory";
/**
 * Помечает свойство сущности для синхронизации
 * */
export declare function fillable<T extends ResourceEntity<ResourceFactory<T>>>(): (target: T, propertyKey: string) => void;
/**
 * @returns массив полей сущности, которые синхронизируются с порталом
 * */
export declare function getFillable<T>(target: ResourceEntity<T>): string[];
/**
 * @returns синхронизируется ли поле сущности c порталом
 * */
export declare function isFillable<T>(target: ResourceEntity<T>, propertyKey: string): boolean;
