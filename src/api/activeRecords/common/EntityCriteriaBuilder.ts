import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import deepmerge from 'deepmerge';

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

    get createCriteria() {
        const attributes = this.entity.getAttributes();
        return this.items.reduce((attributes,item) => {
            return deepmerge(attributes, item.createCriteria);
        }, attributes);
    }

    get updateCriteria() {
        const attributes = this.entity.getAttributes();
        return this.items.reduce((attributes,item) => {
            return deepmerge(attributes, item.updateCriteria);
        }, attributes);
    }
}