import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
import {CriteriaBuilderType, IFactoryCriteriaItem} from "../common/FactoryCriteriaBuilder";
import {IClient} from "../../../Client";

export enum GetWith {
    CONTACTS = 'contacts',
    COMPANIES = 'companies',
    CATALOG_ELEMENTS = 'catalog_elements',
    LOSS_REASON = 'loss_reason'
}

export interface IHasGetByIdCriteria {
    with?: string[];
}

export interface IHasGetById<T extends IResourceEntity<IResourceFactory<T>>> {
    getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<T|null>;
}

export type IHasGetByIdFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IHasGetById<T>;

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

export class GetByIdFactoryCriteriaItem implements IFactoryCriteriaItem {
    fetchCriteria(criteria: IHasGetByIdCriteria = {}) {
        if (!criteria.with) {
            return {};
        }
        return {
            with: criteria.with.join(',')
        };
    }
}

export function hasGetById<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasGetById extends Base implements IHasGetByIdFactory<T> {
        constructor(client: IClient) {
            super(client);
            this.criteriaBuilder.add(new GetByIdFactoryCriteriaItem());
        }

        async getById(identity: number, criteria?: IHasGetByIdCriteria, options?: IRequestOptions) {
            const url = this.getUrl('/' + identity);
            const request = this.getRequest();
            const requestCriteria = this.criteriaBuilder.getCriteria(CriteriaBuilderType.GET, criteria);
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