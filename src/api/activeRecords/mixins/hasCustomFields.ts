import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import {JSONObject, TConstructor, TEntityConstructor} from "../../../types";
import {EntityCustomFieldsList, IEntityCustomFieldsList} from "../common/EntityCustomFieldsList";

export interface IHasCustomFields {
    custom_fields_values?: JSONObject[] | null;
    customFields: IEntityCustomFieldsList;
}

export type IHasCustomFieldsEntity<T extends IResourceFactory<IResourceEntity<T>>> = IResourceEntity<T> & IHasCustomFields;


export function hasCustomFields<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasCustomFields extends Base implements IHasCustomFields {
        public readonly customFields: IEntityCustomFieldsList;

        constructor(entityFactory: T) {
            super(entityFactory);

            this.customFields = new EntityCustomFieldsList({
                entity: this
            });
        }
    };
}