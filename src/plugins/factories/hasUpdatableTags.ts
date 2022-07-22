import { IEntityAttributes, IResourceEntity, IResourceFactory, ISelfResponse } from "../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../types";
import { IHasTagsFactory, ITagsManager } from "../../api/factories/mixins/hasTags";
import { IHasUpdateFactory } from "../../api/factories/mixins/hasUpdate";
import { IRequestOptions } from "../../interfaces/common";
import { ITag, TagAttributes } from "../../api/activeRecords/Tag";

export type THasUpdateAndTagsFactory<T extends IResourceEntity<IHasTagsFactory<T>>> = IHasTagsFactory<T> & IHasUpdateFactory<T>;

export interface IHasUpdatableTagsManager<T extends IResourceEntity<IHasTagsFactory<T>>> extends ITagsManager {
    updateFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<T[]> ;
    removeFor(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]> ;
    remove(options?: IRequestOptions): Promise<ISelfResponse>;
    update(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<ISelfResponse>;
}

export interface IHasUpdatableTagsFactory<T extends IResourceEntity<IHasTagsFactory<T>>> extends IHasTagsFactory<T> {
    get tags(): IHasUpdatableTagsManager<T>;
    updateTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<ISelfResponse>;
    removeTags(options?: IRequestOptions): Promise<ISelfResponse>;
    updateTagsFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<T[]>
    removeTagsFor(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]>
}

export interface IHasUpdatableTagsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    updateTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IHasUpdatableTagsEntity<T>[]>;
    removeTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IHasUpdatableTagsEntity<T>[]>
}

export function hasUpdatableTags<T extends IResourceEntity<IHasTagsFactory<T>>>(Base: TConstructor<THasUpdateAndTagsFactory<T>>) {

    return class HasUpdatableTags extends Base {
        _updatableTags?: IHasUpdatableTagsManager<T>;

        get tags() {
            if (this._updatableTags !== undefined) {
                return this._updatableTags;
            }
            const tags = {
                ...super.tags,
                updateFor: this.updateTagsFor.bind(this),
                removeFor: this.removeTagsFor.bind(this),
                remove: this.removeTags.bind(this),
                update: this.updateTags.bind(this)
            };
            this._updatableTags = tags;
            return tags;
        }

        updateTagsFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            const tags = tagsCriteria && this.getEntityCriteria(tagsCriteria);
            const tagsRequestCriteria = this.getEntityCriteria(criteria)
                .map((attributes: IEntityAttributes) => {
                    return {
                        id: attributes.id,
                        _embedded: {
                            tags
                        }
                    };
                });
            return this.update(tagsRequestCriteria, options);
        }

        removeTagsFor(criteria: (object | T)[], options?: IRequestOptions) {
            return this.updateTagsFor(criteria, null, options);
        }

        async updateTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            const url = this.getUrl();
            const tags = criteria && this.getEntityCriteria(criteria);
            const request = this.getRequest();
            const requestCriteria = {
                _embedded: {
                    tags
                }
            };
            const { data } = await request.patch<ISelfResponse>(url, requestCriteria, options);
            return data;
        }

        removeTags(options?: IRequestOptions) {
            return this.updateTags(null, options);
        }
    };
}