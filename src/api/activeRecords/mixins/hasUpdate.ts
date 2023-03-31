import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasUpdateFactory } from "../../factories/mixins/hasUpdate";


export interface IHasUpdate<T extends IResourceFactory<IResourceEntity<T>>> {
    update(options?: IRequestOptions): Promise<IResourceEntity<T>>;
}

export type IHasUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> = IResourceEntity<T> & IHasUpdate<T>;

export function hasUpdate<T extends IHasUpdateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasUpdate extends Base {
        async update(options?: IRequestOptions) {
            const criteria = this.criteriaBuilder.getUpdateCriteria();
            const [first] = await this.getFactory().update([criteria], options);
            this.updated_at = first.updated_at;

            this.emit('update');
            return first;
        }
    };
}