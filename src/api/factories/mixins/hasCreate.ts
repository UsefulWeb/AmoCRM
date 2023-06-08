import { TFactoryConstructor } from "../../../types";
import {
    ICollectionResponse, IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
import {CriteriaBuilderType} from "../common/FactoryCriteriaBuilder";

export interface ICreateResult {
    id: number;
    request_id: string;
}

export interface IHasCreate<T extends IResourceEntity<IResourceFactory<T>>> {
    create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions): Promise<T[]>;
}

export type IHasCreateFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IHasCreate<T>;

export function hasCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class CanCreate extends Base implements IHasCreateFactory<T> {
        async create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions) {
            const url = this.getUrl();
            const entityCriteria = this.getEntityCriteria(criteria);
            const requestCriteria = this.criteriaBuilder.getCriteria(CriteriaBuilderType.CREATE, entityCriteria);
            const request = this.getRequest();
            const { data } = await request.post<ICollectionResponse<ICreateResult>>(url, requestCriteria, options);
            const response = this.getEmbedded(data);
            this.emit('create');
            return response.map(attributes => this.from(attributes));
        }
    };
}