import { TFactoryConstructor } from "../../../types";
import {
    ICollectionResponse, IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";

export interface IUpdateResult {
    id: number;
    updated_at: number;
    request_id: string;
}

export interface IEntityUpdateAttributes extends IEntityAttributes {
    updated_at?: number;
}

export interface IHasUpdate<T extends IResourceEntity<IResourceFactory<T>>> {
    update(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]>
}

export type IHasUpdateFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IHasUpdate<T>;

export function hasUpdate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasUpdate extends Base implements IResourceFactory<T>, IHasUpdate<T> {
        async update(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]> {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const request = this.getRequest();
            const { data } = await request.patch<ICollectionResponse<IUpdateResult>>(url, requestCriteria, options);
            const response = this.getEmbedded(data);

            this.emit('update');
            return response.map(attributes => this.from(attributes));
        }
    };
}