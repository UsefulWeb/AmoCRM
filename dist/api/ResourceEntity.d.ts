import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IResourceEntity } from "../interfaces/api";
export default class ResourceEntity implements IResourceEntity {
    [index: string]: any;
    protected readonly request: ClientRequest;
    required: string[];
    constructor(request: ClientRequest);
    setAttributes(attributes?: JSONObject): void;
}
