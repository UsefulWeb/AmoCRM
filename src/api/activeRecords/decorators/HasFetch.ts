import { IResourceEntity } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IHasGetByIdCriteria } from "../../factories/mixins/hasGetById";

export interface IHasFetchEntity <T extends ICanGetByIdFactory<IResourceEntity<T>>> {
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IHasFetchEntity<T>|false|null>;
}

export function HasFetch<T extends TEntityConstructor<F>, F extends ICanGetByIdFactory<IResourceEntity<F>>>(Base: T) {
    return class HasFetch extends Base {
        async fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions) {
            if (this.isNew()) {
                return false;
            }
            const id = <number>this.id;
            const factory = this.getFactory();
            const lead = await factory.getById(id, criteria, options);

            this.emit('fetch');
            return lead;
        }
    };
}