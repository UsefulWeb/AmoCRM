import { IRequestOptions } from "../../../interfaces/common";
import { IResourceEntity, IResourceFactory, IResourcePagination } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
export interface IGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}
export interface IHasGetWithCriteria<T> {
    get(criteria?: IGetCriteria, options?: IRequestOptions): Promise<IResourcePagination<T>>;
}
export declare function hasGetByCriteria<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
