import ResourceEntity from "../../ResourceEntity";

export default function required() {
    return function (target: ResourceEntity, propertyKey: string) {
        target.required.push(propertyKey);
    }
}