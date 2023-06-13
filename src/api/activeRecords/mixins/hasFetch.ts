import { IResourceEntity } from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasGetByIdFactory, IHasGetByIdCriteria } from "../../factories/mixins/hasGetById";

export interface IHasFetch<T extends IHasGetByIdFactory<IResourceEntity<T>>> {
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IResourceEntity<T>|null>;
}

// export type IHasFetchEntity<T extends IHasGetByIdFactory<IResourceEntity<T>>> = IResourceEntity<T> & IHasFetch<T>;

export function hasFetch<T extends IHasGetByIdFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    // return class HasFetch extends Base implements IHasFetch<T> {
    return class HasFetch extends Base implements IHasFetch<T> {
        async fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions) {
            if (this.isNew()) {
                return null;
            }
            const id = <number>this.id;
            const factory = this.getFactory();
            const instance = await factory.getById(id, criteria, options);

            this.emit('fetch');
            return instance;
        }
    };
}