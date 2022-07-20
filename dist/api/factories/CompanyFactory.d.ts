/**
 * Фабрика для создания сделок {@link Company}
 * */
import ResourceFactory from "../ResourceFactory";
import { ICompany } from "../activeRecords/Company";
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";
import { IResourceFactory } from "../../interfaces/api";
import { IGetCriteria } from "./mixins/hasGetByCriteria";
import { IHasGetByIdCriteria } from "./mixins/hasGetById";
export interface CompaniesCreateCriteria {
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
export interface CompaniesUpdateCriteria extends CompaniesCreateCriteria {
    id: number;
}
export interface ICompanyFactory extends IResourceFactory<ICompany> {
    /**
     * @param criteria фильтр сделок (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-list)
     * @example
     * ```ts
     * const pagination = await client.companies.get({
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
     * const pagination = await client.companies.get()
     * const data = pagination.getData(); // [company, company]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Company}
     *
     * */
    get(criteria?: IGetCriteria, options?: IRequestOptions): Promise<ResourcePagination<ICompany>>;
    /**
     * Находит сделку по её id
     * @param identity id сделки
     * @param criteria параметры получения сделки (https://www.amocrm.ru/developers/content/crm_platform/companies-api#company-detail)
     * @example
     * ```ts
     * const company = client.companies.getById(123, {
     *     with: 'catalog_elements'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns экземпляр найденной сделки или null, если сделка не найдена.
     * */
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ICompany | null>;
    /**
     * Создаёт новые сделки
     * @param criteria параметры создания сделок (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-add)
     * и/или массив объектов {@link Company}
     * @example
     * ```ts
     * const companies = await client.companies.create([
     *  {
     *      name: "Company 1"
     *  },
     *  {
     *      name: "Company 2"
     *  }
     * ])
     * ```
     *
     * @example
     * ```ts
     * const company1 = new client.Company;
     * company1.name = 'Company 1';
     * const company2 = new client.Company;
     * company2.name = 'Company 2';
     *
     * await client.companies.create([company1, company2])
     * ```
     *
     * @example
     * ```ts
     * const companies = await client.companies.create([
     *  new client.Company({
     *      name: "Company 1"
     *  }),
     *  {
     *      name: "Company 2"
     *  }
     * ]);
     * ```
     *
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Company}. Если в параметр criteria передавались экземпляры {@link Company}, после
     * создания сделок в AmoCRM, у них обновится поле id
     *
     * @example
     * ```ts
     * const company1 = new client.Company;
     * company1.name = 'Company 1';
     * company1.id; // undefined;
     *
     * await client.companies.create([company1])
     *
     * company1.id; // 123
     * ```
     * */
    create(criteria: (CompaniesCreateCriteria | ICompany)[], options?: IRequestOptions): Promise<ICompany[]>;
    /**
     * Обновляет существующие сделки. Принцип работы метода аналогичен {@link create}
     * @param criteria параметры обновления сделок (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-edit)
     * и/или массив объектов {@link Company}
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Company}. Если в параметр criteria передавались экземпляры {@link Company}, после
     * создания сделок в AmoCRM, у них обновится поле id
     * */
    update(criteria: (CompaniesUpdateCriteria | ICompany)[], options?: IRequestOptions): Promise<ICompany[]>;
}
/**
 * Фабрика управления сделками
 * */
export declare class BaseCompanyFactory extends ResourceFactory<ICompany> {
    getEntityClass(): import("../../types").TConstructor<ICompany>;
    getBaseUrl(): string;
    getEmbeddedKey(): string;
}
declare const CompanyFactory: any;
export default CompanyFactory;
