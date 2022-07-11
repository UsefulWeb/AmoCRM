import { IRequestOptions } from "../../../interfaces/common";
import { IPaginatedResponse, IResourceEntity, IResourceFactory, IResourcePagination } from "../../../interfaces/api";
import ResourcePagination from "../../ResourcePagination";
import { TFactoryConstructor } from "../../../types";
import Lead from "../../activeRecords/Lead";

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

export function hasGetByCriteria<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasGwetWithCriteria extends Base implements IHasGetWithCriteria<T>, IResourceFactory<T> {
        async get(criteria?: IGetCriteria, options?: IRequestOptions) {
            const url = this.getUrl();

            const params = {
                url,
                criteria,
                options,
                factory: this,
                embedded: this.getEmbeddedKey()
            };
            const pagination = new ResourcePagination<T>(this.getRequest(), params);
            await pagination.fetch();

            this.emit('get');
            return pagination;
        }

    };
}