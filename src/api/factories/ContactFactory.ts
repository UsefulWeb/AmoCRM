import ResourceFactory from "../ResourceFactory";
import { Contact, IContact } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import schema from "../../schema/v4";
import { IResourceFactory } from "../../interfaces/api";
import { JSONObject } from "../../types";
import {hasGetByCriteria, IGetCriteria, IHasGetFactory} from "./mixins/hasGetByCriteria";
import {hasGetById, IHasGetByIdCriteria, IHasGetByIdFactory} from "./mixins/hasGetById";
import { applyMixins } from "../../util";
import {hasCreate, IHasCreateFactory} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateFactory} from "./mixins/hasUpdate";
import {IHasTagsFactory} from "./mixins/hasTags";

export interface ContactsGetCriteria extends IGetCriteria {
    filter?: object;
}

export interface ContactsCreateCriteria {
    name?: string;
    first_name?: string;
    last_name?: string;
    responsible_user_id?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    custom_fields_values?: JSONObject[] | null;
    _embedded?: JSONObject;
    request_id?: string;
}

export interface ContactCreateResult {
    id: number;
    request_id: string;
}

export interface ContactsUpdateCriteria extends ContactsCreateCriteria {
    id: number;
}

export interface ContactUpdateResult {
    id: number;
    request_id: string;
    updated_at: number;
}

export type IContactFactory = IHasGetFactory<IContact> &
    IHasGetByIdFactory<IContact> &
    IHasCreateFactory<IContact> &
    IHasUpdateFactory<IContact> &
    IResourceFactory<IContact> &
    IHasTagsFactory<IContact>;

/**
 * Фабрика управления контактами
 * */
export class BaseContactFactory extends ResourceFactory<IContact> {

    getEntityClass() {
        return Contact;
    }

    getBaseUrl(): string {
        return schema.entities.contacts.path;
    }

    getEmbeddedKey(): string {
        return 'contacts';
    }
}

export const ContactFactory = applyMixins(BaseContactFactory, [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate
]);