import { IResourceFactory } from "../interfaces/api";
import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import ResourceEntity from "./ResourceEntity";
import EventEmitter from "../common/EventEmitter";

export default abstract class ResourceFactory<T extends ResourceEntity<ResourceFactory<T>>>
    extends EventEmitter
    implements IResourceFactory<T>
{
    protected readonly request: ClientRequest;

    constructor(request: ClientRequest) {
        super();
        this.request = request;
    }

    abstract createEntity(): T;

    from(attributes?: JSONObject): T {
        const instance = this.createEntity();
        instance.setAttributes(attributes);
        return instance;
    }

    protected getEntityCriteria(criteriaData: any[]): JSONObject[] {
        return criteriaData.map(criteria => {
            if (criteria instanceof ResourceEntity) {
                return criteria.getAttributes();
            }
            return criteria;
        });
    }
}