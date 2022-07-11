import { TFactoryConstructor } from "../../../types";
import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface IHasGetByIdCriteria {
    with?: string;
}
export interface ICanGetByIdFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<T | null>;
}
export declare function hasGetById<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
