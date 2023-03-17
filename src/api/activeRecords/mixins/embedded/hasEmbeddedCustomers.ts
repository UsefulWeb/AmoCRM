import {
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../../types";
import { IEmbeddedCustomer, IHasEmbeddedCustomers} from "../../Customer";

export type ICustomerCriteria = (IEmbeddedCustomer)[];

export interface IHasEmbeddedCustomersEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    getCustomers(): IEmbeddedCustomer[];
    addCustomers(criteria: ICustomerCriteria): void;
    removeCustomers(criteria: ICustomerCriteria): void;
    customerList: IEntityCustomerList<T>;
}

export interface IEntityCustomerList<T extends IResourceFactory<IResourceEntity<T>>> {
    get(): IEmbeddedCustomer[];
    add(criteria: ICustomerCriteria): void;
    remove(criteria: ICustomerCriteria): void;
}

export function hasEmbeddedCustomers<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedCustomers extends Base {
        _embedded?: IHasEmbeddedCustomers;
        _embeddedCustomers?: IEntityCustomerList<T>;

        get embeddedCustomers() {
            if (this._embeddedCustomers) {
                return this._embeddedCustomers;
            }

            this._embeddedCustomers = {
                get: this.getEmbeddedCustomers.bind(this),
                add: this.addEmbeddedCustomers.bind(this),
                remove: this.removeEmbeddedCustomers.bind(this)
            };

            return this._embeddedCustomers;
        }

        getEmbeddedCustomers() {
            return this._embedded?.customers || [];
        }
        addEmbeddedCustomers(criteria: ICustomerCriteria) {
            const embedded = this._embedded || {};
            const { customers = []} = embedded;

            const factory = this.getFactory();
            const entityCriteria = factory.getEntityCriteria<IEmbeddedCustomer>(criteria);
            customers.push(...entityCriteria);

            this._embedded = {
                ...embedded,
                customers
            };
        }

        removeEmbeddedCustomers(criteria: ICustomerCriteria) {
            const embedded = this._embedded || {};
            const embeddedCustomers = embedded.customers || [];
            const ids = criteria.map(({ id }) => id);
            const customers = embeddedCustomers.filter(({ id }) => !id || !ids.includes(id));

            this._embedded = {
                ...embedded,
                customers
            };
        }
    };
}