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

import {hasGetByCriteria, IGetCriteria, IHasGetFactory} from "./mixins/hasGetByCriteria";
import {hasGetById, IHasGetByIdCriteria, IHasGetByIdFactory} from "./mixins/hasGetById";
import {hasCreate, IHasCreateFactory} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateFactory} from "./mixins/hasUpdate";
import { applyMixins } from "../../util";
import {hasTags, IHasTagsFactory} from "./mixins/hasTags";

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

export type ICompanyFactory =
    IHasGetFactory<ICompany> &
    IHasGetByIdFactory<ICompany> &
    IHasCreateFactory<ICompany> &
    IHasUpdateFactory<ICompany> &
    IResourceFactory<ICompany> &
    IHasTagsFactory<ICompany>;

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
    hasUpdate,
    hasTags
]);