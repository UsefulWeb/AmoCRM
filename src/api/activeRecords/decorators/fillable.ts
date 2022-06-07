import ResourceEntity from "../../ResourceEntity";

const metadataKey = Symbol('fillable');

export function fillable<T>() {
    return (target: any, propertyKey: string) => {
        const attributes = Reflect.getMetadata(metadataKey, target) || [];
        attributes.push(propertyKey);

        Reflect.defineMetadata(metadataKey, attributes, target);
        Reflect.defineMetadata(metadataKey, true, target, propertyKey);
    }
}

export function getFillable<T>(target: ResourceEntity<T>): string[] {
    return Reflect.getMetadata(metadataKey, target) || [];
}

export function isFillable<T>(target: ResourceEntity<T>, propertyKey: string): boolean {
    return Reflect.getMetadata(metadataKey, target, propertyKey) || false;
}