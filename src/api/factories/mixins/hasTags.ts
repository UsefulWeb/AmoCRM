import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
import { ITagFactory } from "../TagFactory";
import { IGetCriteria } from "./hasGetByCriteria";
import {IClient} from "../../../Client";
import {getEntityFactory} from "../common/getEntityFactory";

export interface IGetTagsCriteria extends IGetCriteria {
    filter?: {
        name?: string,
        id?: number | number[]
    }
}

export interface IHasTags<T extends IResourceEntity<IResourceFactory<T>>> {
    tags: ITagFactory;
}

export type IHasTagsFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IHasTags<T>;

export function hasTags<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasTags extends Base implements IResourceFactory<T>, IHasTags<T> {
        readonly tags: ITagFactory;

        constructor(client: IClient) {
            super(client);
            this.tags = <ITagFactory>getEntityFactory({
                factory: this,
                type: 'tags'
            });
        }
    };
}