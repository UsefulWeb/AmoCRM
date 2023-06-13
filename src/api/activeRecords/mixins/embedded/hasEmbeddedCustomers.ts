import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import { IEmbeddedCustomer} from "../../Customer";
import {IHasCreateAndUpdateEntity, IHasSave, IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IHasEmbedded} from "../hasEmbedded";

export interface IHasEmbeddedCustomersEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    customerList: IEmbeddedEntityList<IEmbeddedCustomer>;
}

export interface IHasEmbeddedCustomersOptions {
    attributes?: IQueryAttributes<IEmbeddedCustomer>;
}

export type IRequiredEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> =
    IResourceEntity<T> &
    IHasSave<T> &
    IHasEmbedded<IEmbedded<IEmbeddedCustomer>>;


export function hasEmbeddedCustomers(options: IHasEmbeddedCustomersOptions = {}) {
    return function hasEmbeddedCustomersConstructor<T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedCustomers extends Base {
            readonly embeddedCustomers: IEmbeddedEntityList<IEmbeddedCustomer>;

            constructor(factory: T) {
                super(factory);
                this.embeddedCustomers = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'customers',
                });

                this.criteriaBuilder.add(this.embeddedCustomers);
            }
        };
    };
}