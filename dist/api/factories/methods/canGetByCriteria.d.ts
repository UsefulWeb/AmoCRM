import { IRequestOptions } from "../../../interfaces/common";
import { IPaginatedResponse, IResourceEntity, IResourceFactory, IResourcePagination } from "../../../interfaces/api";
import ResourcePagination from "../../ResourcePagination";
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
export declare function canGetByCriteria<T extends IResourceEntity>(factory: IResourceFactory<T>): (criteria?: IGetCriteria | undefined, options?: IRequestOptions<IPaginatedResponse> | undefined) => Promise<ResourcePagination<T>>;
