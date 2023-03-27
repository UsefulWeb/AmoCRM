import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";

export interface IHasGetByIdCriteria {
    with?: string[];
}

export interface IHasGetByIdFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<T|null>;
}

export const getRequestCriteria = (criteria?: IHasGetByIdCriteria) => {
    if (!criteria) {
        return;
    }
    if (!criteria.with) {
        return;
    }
    return {
        with: criteria.with.join(',')
    };
};

export function hasGetById<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasGetById extends Base implements IHasGetByIdFactory<T> {
        async getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions) {
            const url = this.getUrl('/' + identity);
            const request = this.getRequest();
            const requestCriteria = getRequestCriteria(criteria);
            const { data } = await request.get<IEntityAttributes>(url, requestCriteria, options);
            if (!data) {
                return null;
            }
            const instance = this.createEntity();

            instance.setAttributes(data);
            this.emit('getById');
            return instance;
        }
    };
}