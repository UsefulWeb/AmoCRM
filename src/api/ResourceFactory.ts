import { IResourceFactory } from "../interfaces/api";
import ClientRequest from "../common/ClientRequest";
import { JSONObject, TStringValueObject } from "../types";
import ResourceEntity from "./ResourceEntity";
import Lead from "./activeRecords/Lead";

export default class ResourceFactory {
    protected readonly request: ClientRequest;
    protected readonly entityClass: typeof ResourceEntity = ResourceEntity;

    constructor(request: ClientRequest) {
        this.request = request;
    }

    from(attributes?: JSONObject) {
        const instance = new this.entityClass(this.request);
        instance.setAttributes(attributes);
        return instance;
    }

    protected getEntityCriteria(criteriaData: any[]): JSONObject[] {
        return criteriaData.map(criteria => {
            if (criteria instanceof ResourceEntity) {
                return criteria.toJSON();
            }
            return criteria;
        });
    }
}