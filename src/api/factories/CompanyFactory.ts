/**
 * Фабрика для создания сделок {@link Company}
 * */
import ResourceFactory from "../ResourceFactory";
import { Company, ICompany } from "../activeRecords/Company";
import schema from '../../schema/v4';
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { JSONObject } from "../../types";
import { IResourceFactory } from "../../interfaces/api";

import { hasGetByCriteria, IGetCriteria } from "./mixins/hasGetByCriteria";
import { hasGetById, IHasGetByIdCriteria } from "./mixins/hasGetById";
import { hasCreate } from "./mixins/hasCreate";
import { hasUpdate } from "./mixins/hasUpdate";
import { applyMixins } from "../../util";

export interface CompaniesGetCriteria extends IGetCriteria {
    filter?: string;
}

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
     * @param criteria фильтр компаний (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-list)
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
    get(criteria?: CompaniesGetCriteria, options?: IRequestOptions): Promise<ResourcePagination<ICompany>>;
    /**
     * Находит компанию по её id
     * @param identity id компании
     * @param criteria параметры получения компании (https://www.amocrm.ru/developers/content/crm_platform/companies-api#company-detail)
     * @example
     * ```ts
     * const company = client.companies.getById(123, {
     *     with: 'catalog_elements'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns экземпляр найденной компании или null, если компания не найдена.
     * */
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ICompany|null>;
    /**
     * Создаёт новые компании
     * @param criteria параметры создания компаний (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-add)
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
     * создания компаний в AmoCRM, у них обновится поле id
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
     * Обновляет существующие компании. Принцип работы метода аналогичен {@link create}
     * @param criteria параметры обновления компаний (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-edit)
     * и/или массив объектов {@link Company}
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Company}. Если в параметр criteria передавались экземпляры {@link Company}, после
     * создания компаний в AmoCRM, у них обновится поле id
     * */
    update(criteria: (CompaniesUpdateCriteria | ICompany)[], options?: IRequestOptions): Promise<ICompany[]>;
}

/**
 * Фабрика управления компаниями
 * */
export class BaseCompanyFactory extends ResourceFactory<ICompany> {

    getEntityClass() {
        return Company;
    }

    getBaseUrl(): string {
        return schema.entities.companies.path;
    }

    getEmbeddedKey(): string {
        return 'companies';
    }
}

export const CompanyFactory = applyMixins(BaseCompanyFactory, [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate
]);