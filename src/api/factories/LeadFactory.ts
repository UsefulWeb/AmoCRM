import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import { TStringValueObject } from "../../types";
import schema from '../../schema/v4';
import { IResourceFactory } from "../../interfaces/api";
import ResourcePagination from "../ResourcePagination";

interface LeadsFindCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}

export default class LeadFactory extends ResourceFactory {
    protected readonly entityClass = Lead;

    async find(criteria: LeadsFindCriteria = {}) {
        const url = schema.entities.leads.path;
        const params = {
            url,
            criteria,
            factory: this,
            embedded: 'leads'
        };
        const pagination = new ResourcePagination(this.request, params);
        await pagination.fetch();
        return pagination;
    }
}