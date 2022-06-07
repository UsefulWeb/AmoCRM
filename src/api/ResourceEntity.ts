import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
import { getFillable, isFillable } from "./activeRecords/decorators/fillable";
import EventEmitter from "../common/EventEmitter";

export default class ResourceEntity<T> extends EventEmitter implements IResourceEntity {
    [index: string]: any;
    protected readonly factory: T;
    public required: string[] = [];

    constructor(factory: T) {
        super();
        this.factory = factory;
    }

    getAttributes(): JSONObject {
        return getFillable(this)
            .reduce((target: JSONObject, key) => {
                if (key in this) {
                    target[key] = this[key];
                }
                return target;
            }, {});
    }

    setAttributes(attributes?: JSONObject) {
        if (!attributes) {
            return;
        }
        for (const attr in attributes) {
            if (isFillable(this, attr)) {
                this[attr] = attributes[attr];
            }
        }
    }
}