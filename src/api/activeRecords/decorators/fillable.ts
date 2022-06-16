/**
 * Декоратор, помечающий свойство сущности как поле для синхронизации с AmoCRM
 * Только свойства, помеченные как @fillable будут
 * отправляться при вызове create, update, fetch методов экземпляра сущности
 * */
import ResourceEntity from "../../ResourceEntity";
import ResourceFactory from "../../ResourceFactory";

const metadataKey = Symbol('fillable');

/**
 * Помечает свойство сущности для синхронизации
 * */
export function fillable<T extends ResourceEntity<ResourceFactory<T>>>() {
    return (target: T, propertyKey: string) => {
        const attributes = Reflect.getMetadata(metadataKey, target) || [];
        attributes.push(propertyKey);

        Reflect.defineMetadata(metadataKey, attributes, target);
        Reflect.defineMetadata(metadataKey, true, target, propertyKey);
    };
}

/**
 * @returns массив полей сущности, которые синхронизируются с порталом
 * */
export function getFillable<T>(target: ResourceEntity<T>): string[] {
    return Reflect.getMetadata(metadataKey, target) || [];
}

/**
 * @returns синхронизируется ли поле сущности c порталом
 * */
export function isFillable<T>(target: ResourceEntity<T>, propertyKey: string): boolean {
    return Reflect.getMetadata(metadataKey, target, propertyKey) || false;
}