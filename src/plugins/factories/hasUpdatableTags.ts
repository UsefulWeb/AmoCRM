import { IEntityAttributes, IResourceEntity, IResourceFactory, ISelfResponse } from "../../interfaces/api";
import { TConstructor } from "../../types";
import { IHasTagsFactory, IFactoryTagList } from "../../api/factories/mixins/hasTags";
import { IHasUpdateFactory } from "../../api/factories/mixins/hasUpdate";
import { IRequestOptions } from "../../interfaces/common";
import { ITag, TagAttributes } from "../../api/activeRecords/Tag";
import { hasUpdatableTags as entityHasUpdatableTags } from '../entities/hasUpdatableTags';
import { applyMixins } from "../../util";

export type THasUpdateAndTagsFactory<T extends IResourceEntity<IHasTagsFactory<T>>> = IHasTagsFactory<T> & IHasUpdateFactory<T>;

export interface IFactoryHasUpdatableTagList<T extends IResourceEntity<IHasTagsFactory<T>>> extends IFactoryTagList {
    setFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<T[]> ;
    clearFor(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]> ;
    clear(options?: IRequestOptions): Promise<ISelfResponse>;
    set(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<ISelfResponse>;
}

export interface IHasUpdatableTagsFactory<T extends IResourceEntity<IHasTagsFactory<T>>> extends IHasTagsFactory<T> {
    get tagList(): IFactoryHasUpdatableTagList<T>;
    setTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<ISelfResponse>;
    removeAllTags(options?: IRequestOptions): Promise<ISelfResponse>;
    setTagsFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<T[]>
    clearTagsFor(criteria: (object | T)[], options?: IRequestOptions): Promise<T[]>
}

export interface IHasUpdatableTagsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    setTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IHasUpdatableTagsEntity<T>[]>;
    removeTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IHasUpdatableTagsEntity<T>[]>
}

export function hasUpdatableTags<T extends IResourceEntity<IHasTagsFactory<T>>>(Base: TConstructor<THasUpdateAndTagsFactory<T>>) {

    return class HasUpdatableTags extends Base {
        _updatableTags?: IFactoryHasUpdatableTagList<T>;

        getEntityClass() {
            return applyMixins(
                super.getEntityClass(),
                [entityHasUpdatableTags]
            );
        }

        get tagList() {
            if (this._updatableTags !== undefined) {
                return this._updatableTags;
            }
            const tagList = {
                ...super.tagList,
                setFor: this.setTagsFor.bind(this),
                clearFor: this.clearTagsFor.bind(this),

                clear: this.clearTags.bind(this),
                set: this.setTags.bind(this)
            };
            this._updatableTags = tagList;
            return tagList;
        }

        setTagsFor(criteria: (object | T)[], tagsCriteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
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

        clearTagsFor(criteria: (object | T)[], options?: IRequestOptions) {
            return this.setTagsFor(criteria, null, options);
        }

        async setTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
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

        clearTags(options?: IRequestOptions) {
            return this.setTags(null, options);
        }
    };
}