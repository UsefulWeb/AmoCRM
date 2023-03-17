import {
    IEmbeddedResourceEntity,
    IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor, TEntityConstructor} from "../../../../types";
import {IEmbeddedTag, IHasEmbeddedTags} from "../../Tag";

export type ITagCriteria = IEmbeddedTag[];

export interface IHasEmbeddedTagsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    getEmbeddedTags(): IEmbeddedTag[];
    addEmbeddedTags(criteria: ITagCriteria): void;
    removeEmbeddedTags(criteria: ITagCriteria): void;
    embeddedTags: IEntityTagList<T>;
}

export interface IEntityTagList<T extends IResourceFactory<IResourceEntity<T>>> {
    get(): IEmbeddedTag[];
    add(criteria: ITagCriteria): void;
    remove(criteria: ITagCriteria): void;
}

export function hasEmbeddedTags<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedTags extends Base {
        _embedded?: IHasEmbeddedTags;
        _embeddedTags?: IEntityTagList<T>;

        get embeddedTags() {
            if (this._embeddedTags) {
                return this._embeddedTags;
            }

            this._embeddedTags = {
                get: this.getEmbeddedTags.bind(this),
                add: this.addEmbeddedTags.bind(this),
                remove: this.removeEmbeddedTags.bind(this)
            };

            return this._embeddedTags;
        }

        getEmbeddedTags() {
            return this._embedded?.tags || [];
        }

        addEmbeddedTags(criteria: ITagCriteria) {
            const embedded = this._embedded || {};
            const { tags = []} = embedded;

            const factory = this.getFactory();
            const entityCriteria = factory.getEntityCriteria(criteria);
            tags.push(...entityCriteria);

            this._embedded = {
                ...embedded,
                tags
            };
        }

        removeEmbeddedTags(criteria: ITagCriteria) {
            const embedded = this._embedded || {};
            const ids = criteria.map(({ id }) => id);
            const tags = this.getEmbeddedTags()
                .filter(({ id }) => !id || !ids.includes(id));

            this._embedded = {
                ...embedded,
                tags
            };
        }
    };
}