import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
import { getFillable, isFillable } from "./activeRecords/decorators/fillable";
import ClientRequest from "../common/ClientRequest";

export default class ResourceEntity implements IResourceEntity {
    [index: string]: any;
    protected readonly request: ClientRequest;
    public required: string[] = [];
    constructor(request: ClientRequest) {
        this.request = request;
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

    toJSON(): JSONObject {
        const attributes = getFillable(this);
        return attributes.reduce((target: JSONObject, attribute) => {
            if (attribute in this) {
                target[attribute] = this[attribute];
            }
            return target;
        }, {});
    }
}