import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasUpdateFactory } from "../../factories/mixins/hasUpdate";

export interface IHasUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    update(options?: IRequestOptions): Promise<T>;
}

export function hasUpdate<T extends IHasUpdateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasUpdate extends Base {
        async update(options?: IRequestOptions) {
            const criteria = this.criteriaBuilder.getUpdateCriteria();
            const [lead] = await this.getFactory().update([criteria], options);

            this.emit('update');
            return lead;
        }
    };
}