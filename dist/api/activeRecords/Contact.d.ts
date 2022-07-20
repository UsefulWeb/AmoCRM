/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { IContactFactory } from "../factories/ContactFactory";
import { JSONObject, TConstructor } from "../../types";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
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
export declare class BaseContact extends ResourceEntity<IContactFactory> {
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
    getAttributes(): ContactAttributes;
    setAttributes(attributes?: ContactAttributes): void;
}
export declare const Contact: TConstructor<IContact>;
