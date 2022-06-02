import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";

export default class ResourceEntity implements IResourceEntity {
    protected readonly request: ClientRequest;
    public fillable: string[] = [];
    public required: string[] = [];
    constructor(request: ClientRequest, attributes?: JSONObject) {
        this.request = request;
    }
}