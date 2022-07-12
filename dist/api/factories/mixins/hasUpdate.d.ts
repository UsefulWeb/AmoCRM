import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface IUpdateResult {
    id: number;
    updated_at: number;
    request_id: string;
}
export interface IEntityUpdateAttributes extends IEntityAttributes {
    updated_at?: number;
}
export interface IHasUpdateFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    update(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]>;
}
export declare function hasUpdate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
