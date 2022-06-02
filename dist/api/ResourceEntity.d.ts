import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
export default class ResourceEntity implements IResourceEntity {
    protected readonly request: ClientRequest;
    fillable: string[];
    required: string[];
    constructor(request: ClientRequest, attributes?: JSONObject);
}
