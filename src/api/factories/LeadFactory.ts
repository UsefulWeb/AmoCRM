import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import schema from '../../schema/v4';
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";
import ResourceEntity from "../ResourceEntity";

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
    _embedded?: JSONObject;

    request_id?: string;
}

export interface LeadCreateResult {
    id: number;
    request_id: string;
}

export interface LeadsUpdateCriteria {
    id: number;
    name?: string;
    price?: number;
    status_id?: number;
    pipeline_id?: number;
    created_by?: number;
    closed_at?: number;
    created_at?: number;
    updated_at?: number;
    loss_reason_id?: number;
    responsible_user_id?: number;
    custom_fields_values?: JSONObject[];

    request_id?: string;
}

export interface LeadUpdateResult {
    id: number;
    request_id: string;
    updated_at: number
}

export default class LeadFactory extends ResourceFactory<Lead> {

    createEntity() {
        return new Lead(this);
    }

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

        this.emit('get');
        return pagination;
    }

    async getById(identity: number | Lead, criteria?: LeadsGetByIdCriteria, options?: IRequestOptions): Promise<Lead> {
        const id = identity instanceof Lead ? identity.id : identity;
        const url = schema.entities.leads.path + '/' + id;
        const { data } = await this.request.get(url, criteria, options);
        const lead = identity instanceof Lead ? identity : this.createEntity();

        lead.setAttributes(data);
        return lead;
    }

    async create(criteria: (LeadsCreateCriteria | Lead)[], options?: IRequestOptions): Promise<Lead[]> {
        const url = schema.entities.leads.path;
        const requestCriteria = this.getEntityCriteria(criteria);
        const { data } = await this.request.post(url, requestCriteria, options);
        const response = data?._embedded?.leads || [];

        const result = response.map((attributes: LeadCreateResult, index: number) => {
            const entityCriteria = criteria[index];
            const lead = entityCriteria instanceof ResourceEntity ?
                entityCriteria :
                this.from(entityCriteria);
            lead.id = attributes.id;
            return lead;
        });
        return result;
    }

    /**
     * @todo https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-complex-add
     * */
    async complexCreate() {

    }

    async update(criteria: (LeadsUpdateCriteria | Lead)[], options?: IRequestOptions): Promise<Lead[]> {
        const url = schema.entities.leads.path;
        const requestCriteria = this.getEntityCriteria(criteria);
        const { data } = await this.request.patch(url, requestCriteria, options);
        const response = data?._embedded?.leads || [];

        const result = response.map((attributes: LeadUpdateResult, index: number) => {
            const entityCriteria = criteria[index];
            const lead = entityCriteria instanceof Lead ?
                entityCriteria :
                this.from(entityCriteria);
            lead.id = attributes.id;
            lead.updated_at = attributes.updated_at;
            return lead;
        });
        return result;
    }
}