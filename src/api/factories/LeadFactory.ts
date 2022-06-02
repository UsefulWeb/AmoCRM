import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import { TStringValueObject } from "../../types";
import schema from '../../schema/v4';
import { IResourceFactory } from "../../interfaces/api";
import ResourcePagination from "../ResourcePagination";

export interface LeadsGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}

export interface LeadsGetByIdCriteria {
    with?: string;
}

export default class LeadFactory extends ResourceFactory {
    protected readonly entityClass = Lead;

    async get(criteria: LeadsGetCriteria = {}) {
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

    async getById(id: number, criteria: LeadsGetByIdCriteria = {}) {
        // const url = schema.entities.leads.path + '/' + id;

    }
}