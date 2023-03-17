import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { ICustomerFactory } from "../factories/CustomerFactory";
import { JSONObject, TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";
import ResourceEntity from "../ResourceEntity";
import { applyMixins } from "../../util";
import { hasCreate } from "./mixins/hasCreate";
import { hasUpdate } from "./mixins/hasUpdate";
import { hasSave } from "./mixins/hasSave";
import { hasFetch } from "./mixins/hasFetch";

export interface CustomerAttributes extends IEntityAttributes {
    name?: string;
    next_price?: number;
    next_date?: number;
    responsible_user_id?: number;
    periodicity?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    custom_fields_values?: JSONObject[] | null;
    _embedded?: JSONObject;
}

export interface IEmbeddedCustomer {
    id: number;
}

export interface IHasEmbeddedCustomers {
    customers?: IEmbeddedCustomer[];
}

export interface ICustomer extends IResourceEntity<ICustomerFactory>, CustomerAttributes {
    create(options?: IRequestOptions): Promise<ICustomer>;
    update(options?: IRequestOptions): Promise<ICustomer>;
    save(options?: IRequestOptions): Promise<ICustomer>;
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ICustomer>;
}

export class BaseCustomer extends ResourceEntity<ICustomerFactory> {
    name?: string;
    next_price?: number;
    next_date?: number;
    responsible_user_id?: number;
    periodicity?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    custom_fields_values?: JSONObject[] | null;
    _embedded?: JSONObject;

    getAttributes(): CustomerAttributes {
        return {
            name: this.name,
            next_price: this.next_price,
            next_date: this.next_date,
            responsible_user_id: this.responsible_user_id,
            periodicity: this.periodicity,
            created_by: this.created_by,
            updated_by: this.updated_by,
            created_at: this.created_at,
            updated_at: this.updated_at,
            custom_fields_values: this.custom_fields_values,
            _embedded: this._embedded
        };
    }

    setAttributes(attributes: CustomerAttributes = {}) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.next_price = attributes.next_price;
        this.responsible_user_id = attributes.responsible_user_id;
        this.periodicity = attributes.periodicity;
        this.created_by = attributes.created_by;
        this.updated_at = attributes.updated_at;
        this.created_at = attributes.created_at;
        this.custom_fields_values = attributes.custom_fields_values;
        this._embedded = attributes._embedded;
    }
}

export const Customer: TConstructor<ICustomer> = applyMixins(BaseCustomer, [
    hasCreate,
    hasUpdate,
    hasSave,
    hasFetch
]);