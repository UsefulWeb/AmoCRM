import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import {IHasCustomFieldsEntity} from "../mixins/hasCustomFields";

export interface IEntityCustomFieldsList {

}

export interface IEntityCustomFieldsListOptions<T extends IResourceFactory<IResourceEntity<T>>> {
    entity: IHasCustomFieldsEntity<T>;
}

export class EntityCustomFieldsList<T extends IResourceFactory<IResourceEntity<T>>> implements IEntityCustomFieldsList {
    protected entity: IHasCustomFieldsEntity<T>;
    constructor(options: IEntityCustomFieldsListOptions<T>) {
        this.entity = options.entity;
    }


}