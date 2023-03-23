import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";

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
    protected entity: IResourceEntity<T>;
    protected items: ICriteriaItem[];
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
            return {
                ...attributes,
                ...item.getCreateCriteria()
            };
        }, attributes);
    }

    getUpdateCriteria() {
        const attributes = this.entity.getAttributes();
        return this.items.reduce((attributes,item) => {
            return {
                ...attributes,
                ...item.getUpdateCriteria()
            };
        }, attributes);
    }
}