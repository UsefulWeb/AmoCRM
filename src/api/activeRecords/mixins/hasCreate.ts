import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";

export interface IHasCreate<T extends IResourceFactory<IResourceEntity<T>>>{
    create(options?: IRequestOptions): Promise<IResourceEntity<T>>;
}

export type IHasCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> = IResourceEntity<T> & IHasCreate<T>;

export function hasCreate<T extends IHasCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasCreate extends Base implements IHasCreate<T> {
        async create(options?: IRequestOptions) {
            const criteria = this.criteriaBuilder.getCreateCriteria();
            const factory = this.getFactory();
            const [first] = await factory.create([criteria], options);

            this.id = first.id;

            this.emit('create');
            return first;
        }
    };
}