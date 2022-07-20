/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject, TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { ICompanyFactory } from "../factories/CompanyFactory";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";
export interface CompanyAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
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
export interface ICompany extends IResourceEntity<ICompanyFactory>, CompanyAttributes {
    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const company = new client.Company({
     *     name: "Walter White"
     * });
     * await company.create();
     * ```
     * @example
     * ```ts
     * const company = new client.Company;
     * company.name = "Walter White";
     * await company.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    create(options?: IRequestOptions): Promise<ICompany>;
    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const company = await client.companies.getById(123);
     * company.name = "Walter White";
     * await company.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    update(options?: IRequestOptions): Promise<ICompany>;
    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions): Promise<ICompany>;
    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const company = new client.Company({ id: 123 });
     * await company.fetch();
     * ```
     * */
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ICompany>;
}
/**
 * Сделка
 */
export declare class BaseCompany extends ResourceEntity<ICompanyFactory> {
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
    getAttributes(): CompanyAttributes;
    setAttributes(attributes?: CompanyAttributes): void;
}
export declare const Company: TConstructor<ICompany>;
