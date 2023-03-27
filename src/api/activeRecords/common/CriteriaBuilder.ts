import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";

export interface ICriteriaBuilder {
    add(item: ICriteriaItem): void;
    getCreateCriteria(): object;
    getUpdateCriteria(): object;
}

export interface ICriteriaItem {
    getCreateCriteria(): object;
    getUpdateCriteria(): object;
}

export class CriteriaBuilder<T extends IResourceFactory<IResourceEntity<T>>>
    implements ICriteriaBuilder, ICriteriaItem {
    protected items: ICriteriaItem[];
    protected entity: IResourceEntity<T>;
    constructor(entity: IResourceEntity<T>) {
        this.entity = entity;
        this.items = [];
    }
    add(item: ICriteriaItem) {
        this.items.push(item);
    }

    getCreateCriteria() {
        const attributes = this.entity.getAttributes();
        return this.items.reduce((attributes,item) => {
            return this.merge(attributes, item.getCreateCriteria());
        }, attributes);
    }

    getUpdateCriteria() {
        const attributes = this.entity.getAttributes();
        return this.items.reduce((attributes,item) => {
            return this.merge(attributes, item.getUpdateCriteria());
        }, attributes);
    }

    protected merge(source: IEntityAttributes, criteria: IEntityAttributes) {
        const { _embedded } = criteria;
        return {
            ...source,
            ...criteria,
            _embedded: {
                ...source._embedded,
                ..._embedded
            }
        };
    }
}