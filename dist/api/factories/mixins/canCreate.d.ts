import { TFactoryConstructor } from "../../../types";
import { ICollectionResponse, IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface CreateResult {
    id: number;
    request_id: string;
}
export interface ICanCreateFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions<ICollectionResponse<CreateResult>>): Promise<T[]>;
}
export declare function canCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
