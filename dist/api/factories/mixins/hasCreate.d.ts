import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface ICreateResult {
    id: number;
    request_id: string;
}
export interface IHasCreateFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions): Promise<T[]>;
}
export declare function hasCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
