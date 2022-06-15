import ResourceFactory from "../ResourceFactory";
import Contact from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
export interface ContactsGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
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
    get(criteria?: ContactsGetCriteria, options?: IRequestOptions): Promise<ResourcePagination<Contact>>;
}
