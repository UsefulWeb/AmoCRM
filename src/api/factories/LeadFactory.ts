import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import schema from '../../schema/v4';
import { IResourceFactory } from "../../interfaces/api";
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";

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

export interface LeadsCreateCriteria {
    name?: string;
    price?: number;
    status_id?: number;
    pipeline_id?: number;
    created_by?: number;
    updated_by?: number;
    closed_at?: number;
    loss_reason_id?: number;
    responsible_user_id?: number;
    custom_fields_values?: JSONObject[] | null;
    _embedded: JSONObject;
}

export default class LeadFactory extends ResourceFactory implements IResourceFactory<Lead> {
    protected readonly entityClass = Lead;

    async get(criteria?: LeadsGetCriteria, options?: IRequestOptions) {
        const url = schema.entities.leads.path;
        const params = {
            url,
            criteria,
            options,
            factory: this,
            embedded: 'leads'
        };
        const pagination = new ResourcePagination<Lead>(this.request, params);
        await pagination.fetch();
        return pagination;
    }

    async getById(id: number, criteria?: LeadsGetByIdCriteria, options?: IRequestOptions): Promise<Lead> {
        const url = schema.entities.leads.path + '/' + id;
        const { data } = await this.request.get(url, criteria, options);
        return this.from(data);
    }

    async create(criteria: LeadsGetByIdCriteria[]): Promise<Lead[]> {
        const url = schema.entities.leads.path;
        const { data } = await this.request.post(url, criteria);
        const { leads = [] } = data?._embedded;

        return leads.map((attributes?: JSONObject) => {
            return this.from(attributes);
        });
    }

    async complexCreate() {

    }

    async update() {

    }
}