/**
 * Фабрика для создания сделок {@link Lead}
 * */
import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";
export interface LeadsGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}
export interface LeadsGetByIdCriteria {
    with?: string;
}
export interface LeadsCreateCriteria {
    name?: string;
    price?: number;
    status_id?: number;
    pipeline_id?: number;
    created_by?: number;
    updated_by?: number;
    closed_at?: number;
    loss_reason_id?: number;
    responsible_user_id?: number;
    custom_fields_values?: JSONObject[] | null;
    _embedded?: JSONObject;
    request_id?: string;
}
export interface LeadCreateResult {
    id: number;
    request_id: string;
}
export interface LeadsUpdateCriteria {
    id: number;
    name?: string;
    price?: number;
    status_id?: number;
    pipeline_id?: number;
    created_by?: number;
    closed_at?: number;
    created_at?: number;
    updated_at?: number;
    loss_reason_id?: number;
    responsible_user_id?: number;
    custom_fields_values?: JSONObject[];
    request_id?: string;
}
export interface LeadUpdateResult {
    id: number;
    request_id: string;
    updated_at: number;
}
/**
 * Основной класс фабрики
 * */
export default class LeadFactory extends ResourceFactory<Lead> {
    createEntity(): Lead;
    /**
     * @param criteria фильтр сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-list)
     * @example
     * ```ts
     * const pagination = await client.leads.get({
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
     * const pagination = await client.leads.get()
     * const data = pagination.getData(); // [lead, lead]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Lead}
     *
     * */
    get(criteria?: LeadsGetCriteria, options?: IRequestOptions): Promise<ResourcePagination<Lead>>;
    /**
     * Находит сделку по её id
     * @param identity id сделки
     * @param criteria параметры получения сделки (https://www.amocrm.ru/developers/content/crm_platform/leads-api#lead-detail)
     * @example
     * ```ts
     * const lead = client.leads.getById(123, {
     *     with: 'catalog_elements'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns экземпляр найденной сделки или null, если сделка не найдена.
     * */
    getById(identity: number, criteria?: LeadsGetByIdCriteria, options?: IRequestOptions): Promise<Lead | null>;
    /**
     * Создаёт новые сделки
     * @param criteria параметры создания сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-add)
     * и/или массив объектов {@link Lead}
     * @example
     * ```ts
     * const leads = await client.leads.create([
     *  {
     *      name: "Lead 1"
     *  },
     *  {
     *      name: "Lead 2"
     *  }
     * ])
     * ```
     *
     * @example
     * ```ts
     * const lead1 = new client.Lead;
     * lead1.name = 'Lead 1';
     * const lead2 = new client.Lead;
     * lead2.name = 'Lead 2';
     *
     * await client.leads.create([lead1, lead2])
     * ```
     *
     * @example
     * ```ts
     * const leads = await client.leads.create([
     *  new client.Lead({
     *      name: "Lead 1"
     *  }),
     *  {
     *      name: "Lead 2"
     *  }
     * ]);
     * ```
     *
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Lead}. Если в параметр criteria передавались экземпляры {@link Lead}, после
     * создания сделок в AmoCRM, у них обновится поле id
     *
     * @example
     * ```ts
     * const lead1 = new client.Lead;
     * lead1.name = 'Lead 1';
     * lead1.id; // undefined;
     *
     * await client.leads.create([lead1])
     *
     * lead1.id; // 123
     * ```
     * */
    create(criteria: (LeadsCreateCriteria | Lead)[], options?: IRequestOptions): Promise<Lead[]>;
    /**
     * @todo https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-complex-add
     * */
    complexCreate(): Promise<void>;
    /**
     * Обновляет существующие сделки. Принцип работы метода аналогичен {@link create}
     * @param criteria параметры обновления сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-edit)
     * и/или массив объектов {@link Lead}
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Lead}. Если в параметр criteria передавались экземпляры {@link Lead}, после
     * создания сделок в AmoCRM, у них обновится поле id
     * */
    update(criteria: (LeadsUpdateCriteria | Lead)[], options?: IRequestOptions): Promise<Lead[]>;
}
