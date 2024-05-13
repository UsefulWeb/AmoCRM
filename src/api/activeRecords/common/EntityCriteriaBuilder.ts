import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import deepmerge from 'deepmerge';
import {overwriteMerge} from "../../../util";

const mergeOptions = {
    arrayMerge: overwriteMerge
}

export interface IEntityCriteriaBuilder extends IEntityCriteriaItem {
    add(item: IEntityCriteriaItem): void;
}

export interface IEntityCriteriaItem {
    createCriteria: object;
    updateCriteria: object;
}

export class EntityCriteriaBuilder<T extends IResourceFactory<IResourceEntity<T>>>
    implements IEntityCriteriaBuilder {
    protected items: IEntityCriteriaItem[];
    protected entity: IResourceEntity<T>;
    constructor(entity: IResourceEntity<T>) {
        this.entity = entity;
        this.items = [];
    }
    add(item: IEntityCriteriaItem) {
        this.items.push(item);
    }

    get attributes(): IEntityAttributes {
        return {
            ...this.entity.getAttributes(),
            _embedded: {}
        };
    }

    get createCriteria() {
        return this.items.reduce((attributes, item) => {
            return deepmerge(attributes, item.createCriteria, mergeOptions);
        }, this.attributes);
    }

    get updateCriteria() {
        return this.items.reduce((attributes,item) => {
            return deepmerge(attributes, item.updateCriteria, mergeOptions);
        }, this.attributes);
    }
}