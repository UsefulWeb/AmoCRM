import { applyMixins } from "../../util";
import {hasGetByCriteria, IGetCriteria, IHasGetFactory} from "./mixins/hasGetByCriteria";
import {hasGetById, IHasGetByIdFactory} from "./mixins/hasGetById";
import {hasCreate, IHasCreateFactory} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateFactory} from "./mixins/hasUpdate";
import { Customer, ICustomer } from "../activeRecords/Customer";
import schema from "../../schema/v4";
import ResourceFactory from "../ResourceFactory";
import { IResourceFactory } from "../../interfaces/api";
import { JSONObject } from "../../types";
import {hasTasks, IHasTasksFactory} from "./mixins/hasTasks";
import {ICompany} from "../activeRecords/Company";
import {IHasTagsFactory} from "./mixins/hasTags";
import {ObjectKey} from "../../interfaces/common";
import {IFactoryConstructors} from "./index";

export interface CustomersGetCriteria extends IGetCriteria {
    filter?: string;
}

export interface CustomersCreateCriteria {
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

export interface CustomerCreateResult {
    id: number;
    request_id: string;
}

export interface CustomersUpdateCriteria extends CustomersCreateCriteria {
    id: number;
}

export interface CustomerUpdateResult {
    id: number;
    request_id: string;
    updated_at: number;
}


export type ICustomerFactory = IHasGetFactory<ICustomer> &
    IHasGetByIdFactory<ICustomer> &
    IHasCreateFactory<ICustomer> &
    IHasUpdateFactory<ICustomer> &
    IResourceFactory<ICustomer> &
    IHasTasksFactory<ICustomer>;

export class BaseCustomerFactory extends ResourceFactory<ICustomer> {
    getEntityClass() {
        return Customer;
    }

    getBaseUrl(): string {
        return schema.entities.customers.path;
    }

    getEmbeddedKey(): ObjectKey<IFactoryConstructors> {
        return 'customers';
    }

    setMode() {

    }
}

export const CustomerFactory = applyMixins(BaseCustomerFactory, [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate,
    hasTasks
]);