import { applyMixins } from "../../util";
import { hasGetByCriteria, IGetCriteria } from "./mixins/hasGetByCriteria";
import { hasGetById } from "./mixins/hasGetById";
import { hasCreate } from "./mixins/hasCreate";
import { hasUpdate } from "./mixins/hasUpdate";
import { Customer, ICustomer } from "../activeRecords/Customer";
import schema from "../../schema/v4";
import ResourceFactory from "../ResourceFactory";
import { IResourceFactory } from "../../interfaces/api";
import { JSONObject } from "../../types";

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


export type ICustomerFactory = IResourceFactory<ICustomer>

export class BaseCustomerFactory extends ResourceFactory<ICustomer> {
    getEntityClass() {
        return Customer;
    }

    getBaseUrl(): string {
        return schema.entities.customers.path;
    }

    getEmbeddedKey(): string {
        return 'customers';
    }

    setMode() {

    }
}

export const CustomerFactory = applyMixins(BaseCustomerFactory, [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate
]);