import ResourceFactory from "../ResourceFactory";
import Contact, { ContactAttributes } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import { ICollectionResponse, IPaginatedResponse } from "../../interfaces/api";
import { JSONObject } from "../../types";
export interface ContactsGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}
export interface ContactsGetByIdCriteria {
    with?: string;
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
/**
 * Фабрика управления контактами
 * */
export default class ContactFactory extends ResourceFactory<Contact> {
    createEntity(): Contact;
    getBaseUrl(): string;
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
    get(criteria?: ContactsGetCriteria, options?: IRequestOptions<IPaginatedResponse<ContactAttributes>>): Promise<ResourcePagination<Contact>>;
    getById(identity: number, criteria?: ContactsGetByIdCriteria, options?: IRequestOptions<ContactAttributes>): Promise<Contact | null>;
    create(criteria: (ContactsCreateCriteria | Contact)[], options?: IRequestOptions<ICollectionResponse<ContactCreateResult>>): Promise<Contact[]>;
    update(criteria: (ContactsUpdateCriteria | Contact)[], options?: IRequestOptions<ICollectionResponse<ContactUpdateResult>>): Promise<Contact[]>;
}
