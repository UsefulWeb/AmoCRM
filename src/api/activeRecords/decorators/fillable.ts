import ResourceEntity from "../../ResourceEntity";

const metadataKey = Symbol('fillable');

export function fillable() {
    return Reflect.metadata(metadataKey, true);
}

export function isFillable(target: ResourceEntity, propertyKey: string) {
    return Reflect.getMetadata(metadataKey, target, propertyKey) || false;
}