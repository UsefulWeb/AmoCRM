/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { IContactFactory } from "../factories/ContactFactory";
import { JSONObject, TConstructor } from "../../types";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { applyMixins } from "../../util";
import { hasCreate } from "./mixins/hasCreate";
import { hasUpdate } from "./mixins/hasUpdate";
import { hasSave } from "./mixins/hasSave";
import { hasFetch } from "./mixins/hasFetch";
import { IRequestOptions } from "../../interfaces/common";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";

export interface ContactAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
    first_name?: string;
    last_name?: string;
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
    _embedded?: JSONObject;
}

export interface IContact extends IResourceEntity<IContactFactory>, ContactAttributes {
    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const contact = new client.Contact({
     *     name: "Walter White"
     * });
     * await contact.create();
     * ```
     * @example
     * ```ts
     * const contact = new client.Contact;
     * contact.name = "Walter White";
     * await contact.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    create(options?: IRequestOptions): Promise<IContact>;
    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const contact = await client.contacts.getById(123);
     * contact.name = "Walter White";
     * await contact.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    update(options?: IRequestOptions): Promise<IContact>;
    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions): Promise<IContact>;
    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const contact = new client.Contact({ id: 123 });
     * await contact.fetch();
     * ```
     * */
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IContact>;
}

export class BaseContact extends ResourceEntity<IContactFactory> {
    name?: string;
    first_name?: string;
    last_name?: string;
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
    _embedded?: JSONObject;

    getAttributes(): ContactAttributes {
        return {
            id: this.id,
            name: this.name,
            first_name: this.first_name,
            last_name: this.last_name,
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

    setAttributes(attributes: ContactAttributes = {}): void {
        this.id = attributes.id;
        this.name = attributes.name;
        this.first_name = attributes.first_name;
        this.last_name = attributes.last_name;
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

export const Contact: TConstructor<IContact> = applyMixins(BaseContact, [
    hasCreate,
    hasUpdate,
    hasSave,
    hasFetch
]);
