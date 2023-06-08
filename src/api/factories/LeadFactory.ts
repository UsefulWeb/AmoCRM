/**
 * Фабрика для создания сделок {@link Lead}
 * */
import ResourceFactory from "../ResourceFactory";
import { Lead, ILead } from "../activeRecords/Lead";
import schema from '../../schema/v4';
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";
import { IResourceFactory } from "../../interfaces/api";

import {hasGetByCriteria, IGetCriteria, IHasGetFactory} from "./mixins/hasGetByCriteria";
import {hasGetById, IHasGetByIdCriteria, IHasGetByIdFactory} from "./mixins/hasGetById";
import {hasCreate, IHasCreateFactory} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateFactory} from "./mixins/hasUpdate";
import { applyMixins } from "../../util";
import {hasTags, IHasTagsFactory} from "./mixins/hasTags";
import {hasTasks, IHasTasksFactory} from "./mixins/hasTasks";

export interface LeadsGetCriteria extends IGetCriteria {
    filter?: object;
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


export interface LeadsUpdateCriteria extends LeadsCreateCriteria {
    id: number;
}

export type ILeadFactory =
    IResourceFactory<ILead> &
    IHasGetFactory<ILead> &
    IHasGetByIdFactory<ILead> &
    IHasCreateFactory<ILead> &
    IHasUpdateFactory<ILead> &
    IHasTagsFactory<ILead> &
    IHasTasksFactory<ILead>;

/**
 * Фабрика управления сделками
 * */
export class BaseLeadFactory extends ResourceFactory<ILead> {

    getEntityClass() {
        return this.getClient().getEntityConstructors().Lead;
    }

    getBaseUrl(): string {
        return schema.entities.leads.path;
    }

    getEmbeddedKey(): string {
        return 'leads';
    }

    /**
     * @todo https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-complex-add
     * */
    async complexCreate() {
        return false;
    }
}

export const mixins = [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate,
    hasTags,
    hasTasks
];

export const LeadFactory = applyMixins(BaseLeadFactory, mixins);