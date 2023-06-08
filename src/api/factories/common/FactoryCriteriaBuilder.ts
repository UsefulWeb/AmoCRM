import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import deepmerge from "deepmerge";
import {ObjectKey} from "../../../interfaces/common";

export type IFactoryCriteria<A extends IEntityAttributes> = ((object | A)[]) | object;

export interface IFactoryCriteriaBuilder {
    add(item: IFactoryCriteriaItem): void;
    getCriteria(type: CriteriaBuilderType, defaults?: object): object;
}

export type IFactoryCriteriaItemCriteria =
    (<A extends IEntityAttributes>(criteria: (object | A)[]) => (object | A)[]) |
    ((criteria: object) => object);

export interface IFactoryCriteriaItem {
    fetchCriteria?: (criteria: object) => object;
    createCriteria?: (criteria: object) => object;
    updateCriteria?: (criteria: object) => object;
    deleteCriteria?: (criteria: object) => object;
}

export enum CriteriaBuilderType {
    GET = 'fetch',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete'
}

export class FactoryCriteriaBuilder<T extends IResourceEntity<IResourceFactory<T>>>
    implements IFactoryCriteriaBuilder {
    protected items: IFactoryCriteriaItem[];
    protected factory: IResourceFactory<T>;
    constructor(factory: IResourceFactory<T>) {
        this.factory = factory;
        this.items = [];
    }

    add(item: IFactoryCriteriaItem) {
        this.items.push(item);
    }

    getCriteria<A extends IEntityAttributes>(type: CriteriaBuilderType, defaults: IFactoryCriteria<A> = []) {
        const method = <ObjectKey<IFactoryCriteriaItem>>(type + 'Criteria');

        return this.items.reduce((data,factoryCriteriaItem) => {
            const patchHandler = factoryCriteriaItem[method];
            if (!patchHandler) {
                return data;
            }
            const patch = patchHandler.call(factoryCriteriaItem, defaults);
            if (Array.isArray(data)) {
                return data.map(
                    attributes => deepmerge(attributes, patch)
                );
            }
            return deepmerge(data, patch);
        }, defaults);
    }
}