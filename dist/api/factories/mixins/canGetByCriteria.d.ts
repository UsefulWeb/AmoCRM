import { IRequestOptions } from "../../../interfaces/common";
import { IPaginatedResponse, IResourceEntity, IResourceFactory, IResourcePagination } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
export interface IGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}
export interface ICanGetWithCriteria<T> {
    get(criteria?: IGetCriteria, options?: IRequestOptions<IPaginatedResponse>): Promise<IResourcePagination<T>>;
}
export declare function canGetByCriteria<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
