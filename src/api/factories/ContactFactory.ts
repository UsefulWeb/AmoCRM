import ResourceFactory from "../ResourceFactory";
import Contact, { ContactAttributes } from "../activeRecords/Contact";
import { IRequestOptions } from "../../interfaces/common";
import ResourcePagination from "../ResourcePagination";
import schema from "../../schema/v4";
import { ICollectionResponse, IPaginatedResponse } from "../../interfaces/api";
import ResourceEntity from "../ResourceEntity";
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

    async getById(identity: number, criteria?: ContactsGetByIdCriteria, options?: IRequestOptions<ContactAttributes>): Promise<Contact|null> {
        const url = this.getUrl('/' + identity);
        const { data } = await this.request.get(url, criteria, options);
        if (!data) {
            return null;
        }
        const contact = this.createEntity();

        contact.setAttributes(data);
        return contact;
    }

    async create(criteria: (ContactsCreateCriteria | Contact)[], options?: IRequestOptions<ICollectionResponse<ContactCreateResult>>): Promise<Contact[]> {
        const url = this.getUrl();
        const requestCriteria = this.getEntityCriteria(criteria);
        const { data } = await this.request.post(url, requestCriteria, options);
        const response = data?._embedded?.contacts || [];

        const result = response.map((attributes, index: number) => {
            const entityCriteria = criteria[index];
            const contact = entityCriteria instanceof ResourceEntity ?
                entityCriteria :
                this.from(entityCriteria);
            contact.id = attributes.id;
            return contact;
        });
        return result;
    }

    async update(criteria: (ContactsUpdateCriteria | Contact)[], options?: IRequestOptions<ICollectionResponse<ContactUpdateResult>>): Promise<Contact[]> {
        const url = this.getUrl();
        const requestCriteria = this.getEntityCriteria(criteria);
        const { data } = await this.request.patch(url, requestCriteria, options);
        const response = data?._embedded?.contacts || [];

        const result = response.map((attributes, index: number) => {
            const entityCriteria = criteria[index];
            const contact = entityCriteria instanceof Contact ?
                entityCriteria :
                this.from(entityCriteria);
            contact.id = attributes.id;
            contact.updated_at = attributes.updated_at;
            return contact;
        });
        return result;
    }
}