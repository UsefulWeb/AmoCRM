import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";
export interface IHasCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    create(options?: IRequestOptions): Promise<IHasCreateEntity<T>>;
}
export declare function hasCreate<T extends IHasCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>>;
