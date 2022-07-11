import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanUpdateFactory } from "../../factories/mixins/canUpdate";

export interface IHasUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    update(options?: IRequestOptions): Promise<T>;
}

export function hasUpdate<T extends ICanUpdateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T> {
    return class HasUpdate extends Base {
        async update(options?: IRequestOptions) {
            const criteria = [this];
            const [lead] = await this.getFactory().update(criteria, options);

            this.emit('update');
            return lead;
        }
    };
}