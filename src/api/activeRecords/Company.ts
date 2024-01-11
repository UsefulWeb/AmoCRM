/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject, TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { ICompanyFactory } from "../factories/CompanyFactory";
import {IEmbedded, IEntityAttributes, IResourceEntity} from "../../interfaces/api";
import { applyMixins } from "../../util";
import {hasSave, IHasSave, IHasSaveEntity} from "./mixins/hasSave";
import {hasFetch, IHasFetch} from "./mixins/hasFetch";
import {hasCreate, IHasCreateEntity} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateEntity} from "./mixins/hasUpdate";
import {hasEmbeddedTags, IHasEmbeddedTagsEntity} from "./mixins/embedded/hasEmbeddedTags";
import {hasEmbeddedCustomers, IHasEmbeddedCustomersEntity} from "./mixins/embedded/hasEmbeddedCustomers";
import {
    hasEmbeddedCatalogElements,
    IHasEmbeddedCatalogElementsEntity
} from "./mixins/embedded/hasEmbeddedCatalogElements";
import {hasEmbeddedContacts, IHasEmbeddedContactsEntity} from "./mixins/embedded/hasEmbeddedContacts";
import {hasEmbedded, IHasEmbedded} from "./mixins/hasEmbedded";
import {hasTasks, IHasTasks} from "./mixins/hasTasks";
import {IHasCustomFields} from "./mixins/hasCustomFields";

export interface CompanyAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
    responsible_user_id?: number;
    group_id?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    is_deleted?: boolean;
    closed_task_at?: number;
    custom_fields_values?: JSONObject[] | null;
    account_id?: number;
    _embedded?: ICompanyEmbedded;
}

export interface IEmbeddedCompany {
    id?: number;
}

export interface IHasEmbeddedCompanies {
    companies?: IEmbeddedCompany[];
}

export type ICompanyEmbedded = IHasEmbeddedTagsEntity<ICompanyFactory> &
    IHasEmbeddedContactsEntity<ICompanyFactory> &
    IHasEmbeddedCustomersEntity<ICompanyFactory> &
    IHasEmbeddedCatalogElementsEntity<ICompanyFactory>;

export type ICompany = IResourceEntity<ICompanyFactory> &
    CompanyAttributes &
    IHasCustomFields &
    IHasEmbedded<ICompanyEmbedded> &
    IHasSave<ICompanyFactory> &
    IHasFetch<ICompanyFactory> &
    ICompanyEmbedded &
    IHasTasks<ICompanyFactory>;

/**
 * Сделка
 */
export class BaseCompany extends ResourceEntity<ICompanyFactory> {
    name?: string;
    price?: number;
    responsible_user_id?: number;
    group_id?: number;
    status_id?: number;
    pipeline_id?: number;
    loss_reason_id?: number;
    source_id?: number;
    created_by?: number;
    updated_by?: number;
    closed_at?: number;
    created_at?: number;
    closed_task_at?: number;
    is_deleted?: boolean;
    custom_fields_values?: JSONObject[] | null;
    score?: number | null;
    account_id?: number;
    is_price_modified_by_robot?: boolean;
    _embedded?: ICompanyEmbedded;

    getAttributes(): CompanyAttributes {
        return {
            id: this.id,
            name: this.name,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            created_by: this.created_by,
            updated_at: this.updated_at,
            is_deleted: this.is_deleted,
            closed_task_at: this.closed_task_at,
            custom_fields_values: this.custom_fields_values,
            account_id: this.account_id,
            _embedded: this._embedded
        };
    }

    setAttributes(attributes: CompanyAttributes = {}): void {
        this.id = attributes.id;
        this.name = attributes.name;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.created_by = attributes.created_by;
        this.updated_at = attributes.updated_at;
        this.is_deleted = attributes.is_deleted;
        this.closed_task_at = attributes.closed_task_at;
        this.custom_fields_values = attributes.custom_fields_values;
        this.account_id = attributes.account_id;
        this._embedded = attributes._embedded;
    }
}

export const mixins = [
    hasCreate,
    hasUpdate,
    hasSave,
    hasFetch,
    hasEmbedded,
    hasTasks
];

export const embeddedMixins = [
    hasEmbeddedTags({
        attributes: {
            save: ['id', 'name']
        }
    }),
    hasEmbeddedCustomers(),
    hasEmbeddedContacts(),
    hasEmbeddedCatalogElements()
];

export const Company: TConstructor<ICompany> = applyMixins(BaseCompany, [
    ...mixins,
    ...embeddedMixins
]);