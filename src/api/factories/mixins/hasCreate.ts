import { TFactoryConstructor } from "../../../types";
import {
    ICollectionResponse, IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";

export interface ICreateResult {
    id: number;
    request_id: string;
}

export interface IHasCreateFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions): Promise<T[]>;
}

export function hasCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class CanCreate extends Base {
        async create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions) {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const request = this.getRequest();
            const { data } = await request.post<ICollectionResponse<ICreateResult>>(url, requestCriteria, options);
            const response = this.getEmbedded(data);
            this.emit('create');
            return response.map(attributes => this.from(attributes));
        }
    };
}