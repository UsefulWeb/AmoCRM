import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IGetByIdCriteria } from "../../factories/mixins/canGetById";

export interface ICanFetchEntity<T extends ICanGetByIdFactory<ICanFetchEntity<T>>> extends IResourceEntity<T> {
    fetch(criteria?: IGetByIdCriteria, options?: IRequestOptions<T>): Promise<T|false|null>;
}

// export type TCanFetchEntityConstructor<> =

export function canSave<T extends ICanFetchEntity<ICanGetByIdFactory<T>>>(Base: TEntityConstructor<ICanFetchEntity<T>>) {
    return class CanFetch extends Base {
        async fetch(criteria?: IGetByIdCriteria, options?: IRequestOptions<ICanFetchEntity<T>>) {
            if (this.isNew()) {
                return false;
            }
            const id = <number>this.id;
            const lead = await this.getFactory().getById(id, criteria, options);

            this.emit('fetch');
            return lead;
        }
    };
}