import { IRequestOptions } from "../../../interfaces/common";
import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import ResourcePagination, {IResourcePagination} from "../../ResourcePagination";
import { TFactoryConstructor } from "../../../types";

export interface IGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    order?: string;
}

export interface IHasGetFactory<T> {
    get(criteria?: IGetCriteria, options?: IRequestOptions): Promise<IResourcePagination<T>>;
}

export function hasGetByCriteria<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasGetWithCriteria extends Base implements IHasGetFactory<T>, IResourceFactory<T> {
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