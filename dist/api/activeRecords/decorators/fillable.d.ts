import ResourceEntity from "../../ResourceEntity";
export declare function fillable(): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function isFillable(target: ResourceEntity, propertyKey: string): any;
