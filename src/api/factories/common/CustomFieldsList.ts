import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import {ICustomFieldsFactory} from "../mixins/hasCustomFields";

export interface IFactoryCustomFieldsList {
    define()
}

export interface IFactoryCustomFieldsListOptions<T extends IResourceEntity<IResourceFactory<T>>> {
    factory: ICustomFieldsFactory<T>;
}

export class FactoryCustomFieldsList<T extends IResourceEntity<IResourceFactory<T>>> implements IFactoryCustomFieldsList {
    protected factory: ICustomFieldsFactory<T>;
    constructor(options: IFactoryCustomFieldsListOptions<T>) {
        this.factory = options.factory;
    }
}