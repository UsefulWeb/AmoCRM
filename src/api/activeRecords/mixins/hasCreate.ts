import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";

export interface IHasCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    create(options?: IRequestOptions): Promise<T|false>;
}

export function hasCreate<T extends IHasCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T> {
    return class HasCreate extends Base {
        async create(options?: IRequestOptions) {
            const criteria = [this];
            const factory = this.getFactory();
            const [first] = await factory.create(criteria, options);

            this.emit('create');
            return first;
        }
    };
}