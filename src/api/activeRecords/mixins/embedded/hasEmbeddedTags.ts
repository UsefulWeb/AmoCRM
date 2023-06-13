import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor} from "../../../../types";
import {IEmbeddedTag} from "../../Tag";
import {IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IHasEmbedded} from "../hasEmbedded";

export interface IHasEmbeddedTagsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedTags: IEmbeddedEntityList<IEmbeddedTag>;
}

export interface IHasEmbeddedTagsOptions {
    attributes?: IQueryAttributes<IEmbeddedTag>;
}

export type IRequiredEntity<T extends IResourceFactory<IHasSaveEntity<T>>> =
    IHasSaveEntity<T> &
    IHasEmbedded<IEmbedded<IEmbeddedTag>>;

export function hasEmbeddedTags(options: IHasEmbeddedTagsOptions = {}) {
    return function hasEmbeddedTagsConstructor
        <T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedTags extends Base {
            readonly embeddedTags: IEmbeddedEntityList<IEmbeddedTag>;

            constructor(factory: T) {
                super(factory);
                this.embeddedTags = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'tags',
                });

                this.criteriaBuilder.add(this.embeddedTags);
            }
        };
    };
}