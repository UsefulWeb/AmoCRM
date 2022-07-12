import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";
export interface IHasCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    create(options?: IRequestOptions): Promise<T | false>;
}
export declare function HasCreate<T extends IHasCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T>;
