import ResourceEntity from "../../ResourceEntity";

export default function fillable() {
    return function (target: any, propertyKey: string) {
        if (!('fillable' in target)) {
            return
        }
        target.fillable.push(propertyKey);
    }
}