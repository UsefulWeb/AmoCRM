import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
import { ITagFactory } from "../TagFactory";
import { IGetCriteria } from "./hasGetByCriteria";
import {IClient} from "../../../Client";
import {getEntityFactory} from "../common/getEntityFactory";
import {FactoryCustomFieldsList, IFactoryCustomFieldsList} from "../common/CustomFieldsList";

export interface IGetTagsCriteria extends IGetCriteria {
    filter?: {
        name?: string,
        id?: number | number[]
    }
}

export interface IFactoryHasCustomFields<T extends IResourceEntity<IResourceFactory<T>>> {
    customFields: IFactoryCustomFieldsList;
}

export type ICustomFieldsFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IFactoryHasCustomFields<T>;

export function hasCustomFields<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasCustomFields extends Base implements IResourceFactory<T>, IFactoryHasCustomFields<T> {
        readonly customFields: IFactoryCustomFieldsList;

        constructor(client: IClient) {
            super(client);
            this.customFields = new FactoryCustomFieldsList({
                factory: this,
            });
        }
    };
}