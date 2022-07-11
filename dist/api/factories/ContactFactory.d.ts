import ResourceFactory from "../ResourceFactory";
import { IContact } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import { IResourceFactory } from "../../interfaces/api";
import { JSONObject } from "../../types";
import { IGetCriteria } from "./mixins/hasGetByCriteria";
import { ILead } from "../activeRecords/Lead";
import { IHasGetByIdCriteria } from "./mixins/hasGetById";
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
export interface IContactFactory extends IResourceFactory<IContact> {
    /**
     * @param criteria фильтр контактов (https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-list)
     * @example
     * ```ts
     * const pagination = await client.contacts.get({
     *     order: 'created_at',
     *     page: 2,
     *     query: 'Иванов'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns постраничную навигацию, экземпляр {@link ResourcePagination}
     *
     * @example
     * ```ts
     * const pagination = await client.contacts.get()
     * const data = pagination.getData(); // [contact, contact]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Contact}
     * */
    get(criteria?: IGetCriteria, options?: IRequestOptions): Promise<ResourcePagination<IContact>>;
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IContact | null>;
    create(criteria: (ContactsCreateCriteria | IContact)[], options?: IRequestOptions): Promise<IContact[]>;
    update(criteria: (ContactsUpdateCriteria | ILead)[], options?: IRequestOptions): Promise<ILead[]>;
}
/**
 * Фабрика управления контактами
 * */
export declare class BaseContactFactory extends ResourceFactory<IContact> {
    getEntityClass(): any;
    getBaseUrl(): string;
    getEmbeddedKey(): string;
}
declare const ContactFactory: any;
export default ContactFactory;
