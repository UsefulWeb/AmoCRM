import ResourceFactory from "../ResourceFactory";
import Contact, { ContactAttributes } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import schema from "../../schema/v4";
import { IPaginatedResponse } from "../../interfaces/api";


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
export default class ContactFactory extends ResourceFactory<Contact, ContactAttributes> {

    createEntity(): Contact {
        return new Contact(this);
    }

    getBaseUrl(): string {
        return schema.entities.contacts.path;
    }

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
    async get(criteria?: ContactsGetCriteria, options?: IRequestOptions<IPaginatedResponse<ContactAttributes>>) {
        const url = this.getUrl();

        const params = {
            url,
            criteria,
            options,
            factory: this,
            embedded: 'contacts'
        };
        const pagination = new ResourcePagination<Contact, ContactAttributes>(this.request, params);
        await pagination.fetch();

        this.emit('get');
        return pagination;
    }
}