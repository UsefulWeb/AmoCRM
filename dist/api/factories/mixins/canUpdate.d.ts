import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
export interface UpdateResult {
    id: number;
    updated_at: number;
    request_id: string;
}
export interface IEntityUpdateAttributes extends IEntityAttributes {
    updated_at?: number;
}
export declare function canUpdate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
