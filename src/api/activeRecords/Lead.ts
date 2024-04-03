/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject, TConstructor } from "../../types";
import { ILeadFactory } from "../factories/LeadFactory";
import {IEntityAttributes, IResourceEntity} from "../../interfaces/api";
import { applyMixins } from "../../util";
import {hasSave, IHasSave} from "./mixins/hasSave";
import {hasFetch, IHasFetch} from "./mixins/hasFetch";
import {hasCreate} from "./mixins/hasCreate";
import {hasUpdate} from "./mixins/hasUpdate";
import {IHasEmbeddedTags} from "./Tag";
import { IHasEmbeddedContacts} from "./Contact";
import { IHasEmbeddedCompanies} from "./Company";
import { IHasEmbeddedCatalogElements} from "./CatalogElement";
import {hasEmbeddedTags, IHasEmbeddedTagsEntity} from "./mixins/embedded/hasEmbeddedTags";
import {hasEmbeddedContacts, IHasEmbeddedContactsEntity} from "./mixins/embedded/hasEmbeddedContacts";
import {hasEmbeddedCompanies, IHasEmbeddedCompaniesEntity} from "./mixins/embedded/hasEmbeddedCompanies";
import {
    hasEmbeddedCatalogElements,
    IHasEmbeddedCatalogElementsEntity
} from "./mixins/embedded/hasEmbeddedCatalogElements";
import {IHasEmbeddedLossReasons} from "./LossReason";
import {IHasEmbeddedSource} from "./Source";
import {hasEmbeddedSource} from "./mixins/embedded/hasEmbeddedSource";
import {hasEmbedded, IHasEmbedded} from "./mixins/hasEmbedded";
import {hasTasks, IHasTasks} from "./mixins/hasTasks";

export interface LeadAttributes extends IEntityAttributes {
    id?: number;
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
    updated_at?: number;
    closed_task_at?: number;
    is_deleted?: boolean;
    custom_fields_values?: JSONObject[] | null;
    score?: number | null;
    account_id?: number;
    labor_cost?: number;
    is_price_modified_by_robot?: boolean;
    _embedded?: ILeadEmbedded;
}

export type ILeadHasEmbedded = IHasEmbeddedTagsEntity<ILeadFactory> &
    IHasEmbeddedContactsEntity<ILeadFactory> &
    IHasEmbeddedCompaniesEntity<ILeadFactory> &
    IHasEmbeddedCatalogElementsEntity<ILeadFactory>;

export type ILead = IResourceEntity<ILeadFactory> &
    LeadAttributes &
    IHasEmbedded<ILeadEmbedded> &
    IHasSave<ILeadFactory> &
    IHasFetch<ILeadFactory> &
    ILeadHasEmbedded &
    IHasTasks<ILeadFactory>;

export type ILeadEmbedded =
    IHasEmbeddedTags &
    IHasEmbeddedContacts &
    IHasEmbeddedCompanies &
    IHasEmbeddedCatalogElements &
    IHasEmbeddedLossReasons &
    IHasEmbeddedSource;

/**
 * Сделка
 */
export class BaseLead extends ResourceEntity<ILeadFactory> {
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
    labor_cost?: number;
    is_price_modified_by_robot?: boolean;
    _embedded?: ILeadEmbedded;

    public getAttributes(): LeadAttributes {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            status_id: this.status_id,
            pipeline_id: this.pipeline_id,
            loss_reason_id: this.loss_reason_id,
            source_id: this.source_id,
            created_by: this.created_by,
            updated_at: this.updated_at,
            closed_task_at: this.closed_task_at,
            is_deleted: this.is_deleted,
            custom_fields_values: this.custom_fields_values,
            score: this.score,
            account_id: this.account_id,
            labor_cost: this.labor_cost,
            is_price_modified_by_robot: this.is_price_modified_by_robot,
            _embedded: this._embedded
        };
    }

    public setAttributes(attributes: LeadAttributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.price = attributes.price;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.status_id = attributes.status_id;
        this.pipeline_id = attributes.pipeline_id;
        this.loss_reason_id = attributes.loss_reason_id;
        this.source_id = attributes.source_id;
        this.created_by = attributes.created_by;
        this.updated_by = attributes.updated_by;
        this.closed_at = attributes.closed_at;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at;
        this.closed_task_at = attributes.closed_task_at;
        this.is_deleted = attributes.is_deleted;
        this.custom_fields_values = attributes.custom_fields_values;
        this.score = attributes.score;
        this.account_id = attributes.account_id;
        this.labor_cost = attributes.labor_cost;
        this.is_price_modified_by_robot = attributes.is_price_modified_by_robot;
        this._embedded = attributes._embedded;
    }
}

export const mixins = [
    hasCreate,
    hasUpdate,
    hasSave,
    hasFetch,
    hasEmbedded,
    hasTasks,
];

export const embeddedMixins = [
    hasEmbeddedTags({
        attributes: {
            save: ['id', 'name']
        }
    }),
    hasEmbeddedContacts({
        attributes: {
            save: ['id', "is_main"]
        }
    }),
    hasEmbeddedCompanies({
        attributes: {
            save: ['id']
        }
    }),
    hasEmbeddedCatalogElements(),
    hasEmbeddedSource
];

export const Lead: TConstructor<ILead> = applyMixins(BaseLead, [
    ...mixins,
    ...embeddedMixins
]);