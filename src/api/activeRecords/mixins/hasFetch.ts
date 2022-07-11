import { IResourceEntity } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IGetByIdCriteria } from "../../factories/mixins/canGetById";

export interface IHasFetchEntity <T extends ICanGetByIdFactory<IResourceEntity<T>>> {
    fetch(criteria?: IGetByIdCriteria, options?: IRequestOptions): Promise<IHasFetchEntity<T>|false|null>;
}

export function hasFetch<T extends ICanGetByIdFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T> {
    return class HasFetch extends Base {
        async fetch(criteria?: IGetByIdCriteria, options?: IRequestOptions) {
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