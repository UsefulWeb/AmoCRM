import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import ResourceEntity from "./ResourceEntity";
export default class ResourceFactory {
    protected readonly request: ClientRequest;
    protected readonly entityClass: typeof ResourceEntity;
    constructor(request: ClientRequest);
    create(attributes: JSONObject): ResourceEntity;
}
