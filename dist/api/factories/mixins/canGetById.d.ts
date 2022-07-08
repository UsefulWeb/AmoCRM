import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface IGetByIdCriteria {
    with?: string;
}
export interface ICanGetByIdFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    getById(identity: number, criteria?: IGetByIdCriteria, options?: IRequestOptions<IEntityAttributes>): Promise<T | null>;
}
export declare function canGetById<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
