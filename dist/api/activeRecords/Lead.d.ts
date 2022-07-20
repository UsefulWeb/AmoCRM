/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject, TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { ILeadFactory } from "../factories/LeadFactory";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";
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
    is_price_modified_by_robot?: boolean;
    _embedded?: JSONObject;
}
export interface ILead extends IResourceEntity<ILeadFactory>, LeadAttributes {
    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const lead = new client.Lead({
     *     name: "Walter White"
     * });
     * await lead.create();
     * ```
     * @example
     * ```ts
     * const lead = new client.Lead;
     * lead.name = "Walter White";
     * await lead.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    create(options?: IRequestOptions): Promise<ILead>;
    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = await client.leads.getById(123);
     * lead.name = "Walter White";
     * await lead.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    update(options?: IRequestOptions): Promise<ILead>;
    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions): Promise<ILead>;
    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = new client.Lead({ id: 123 });
     * await lead.fetch();
     * ```
     * */
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ILead>;
}
/**
 * Сделка
 */
export declare class BaseLead extends ResourceEntity<ILeadFactory> {
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
    is_price_modified_by_robot?: boolean;
    _embedded?: JSONObject;
    getAttributes(): LeadAttributes;
    setAttributes(attributes: LeadAttributes): void;
}
export declare const Lead: TConstructor<ILead>;
