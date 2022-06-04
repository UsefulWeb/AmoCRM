import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
import { isFillable } from "./activeRecords/decorators/fillable";
import ResourceFactory from "./ResourceFactory";

export default class ResourceEntity implements IResourceEntity {
    [index: string]: any;
    protected readonly factory: ResourceFactory;
    public required: string[] = [];
    constructor(factory: ResourceFactory) {
        this.factory = factory;
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