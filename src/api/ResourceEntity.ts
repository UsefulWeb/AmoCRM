import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
import { isFillable } from "./activeRecords/decorators/fillable";

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
            const canFill = isFillable(this, attr);
            if (isFillable(this, attr)) {
                this[attr] = attributes[attr];
            }
        }
    }
}