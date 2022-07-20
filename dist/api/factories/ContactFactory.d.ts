import ResourceFactory from "../ResourceFactory";
import { IContact } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import { IResourceFactory } from "../../interfaces/api";
import { JSONObject } from "../../types";
import { IGetCriteria } from "./mixins/hasGetByCriteria";
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
    /**
     * Находит контакт по её id
     * @param identity id контакта
     * @param criteria параметры получения контакта (https://www.amocrm.ru/developers/content/crm_platform/contacts-api#ontact-detail)
     * @example
     * ```ts
     * const contact = client.contacts.getById(123, {
     *     with: 'catalog_elements'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns экземпляр найденного контакта или null, если контакт не найден.
     * */
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IContact | null>;
    /**
     * Создаёт новые контакты
     * @param criteria параметры создания контактов (https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-add)
     * и/или массив объектов {@link Contact}
     * @example
     * ```ts
     * const contacts = await client.contacts.create([
     *  {
     *      name: "Contact 1"
     *  },
     *  {
     *      name: "Contact 2"
     *  }
     * ])
     * ```
     *
     * @example
     * ```ts
     * const contact1 = new client.Contact;
     * contact1.name = 'Contact 1';
     * const contact2 = new client.Contact;
     * contact2.name = 'Contact 2';
     *
     * await client.contacts.create([contact1, contact2])
     * ```
     *
     * @example
     * ```ts
     * const contacts = await client.contacts.create([
     *  new client.Contact({
     *      name: "Contact 1"
     *  }),
     *  {
     *      name: "Contact 2"
     *  }
     * ]);
     * ```
     *
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Contact}. Если в параметр criteria передавались экземпляры {@link Contact}, после
     * создания уонтакта в AmoCRM, у них обновится поле id
     *
     * @example
     * ```ts
     * const contact1 = new client.Contact;
     * contact1.name = 'Contact 1';
     * contact1.id; // undefined;
     *
     * await client.contacts.create([contact1])
     *
     * contact1.id; // 123
     * ```
     * */
    create(criteria: (ContactsCreateCriteria | IContact)[], options?: IRequestOptions): Promise<IContact[]>;
    /**
     * Обновляет существующие сделки. Принцип работы метода аналогичен {@link create}
     * @param criteria параметры обновления сделок (https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-edit)
     * и/или массив объектов {@link Contact}
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Contact}. Если в параметр criteria передавались экземпляры {@link Contact}, после
     * создания сделок в AmoCRM, у них обновится поле id
     * */
    update(criteria: (ContactsUpdateCriteria | IContact)[], options?: IRequestOptions): Promise<IContact[]>;
}
/**
 * Фабрика управления контактами
 * */
export declare class BaseContactFactory extends ResourceFactory<IContact> {
    getEntityClass(): import("../../types").TConstructor<IContact>;
    getBaseUrl(): string;
    getEmbeddedKey(): string;
}
export declare const ContactFactory: any;
