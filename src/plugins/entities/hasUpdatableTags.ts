import { IResourceEntity } from "../../interfaces/api";
import { TConstructor } from "../../types";
import { ITag, TagAttributes } from "../../api/activeRecords/Tag";
import { IRequestOptions } from "../../interfaces/common";
import { IHasUpdatableTagsFactory } from "../factories/hasUpdatableTags";

export interface IEntityHasUpdatableTagList<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>> {
    update(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
    clear(options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
}

export interface IEntityHasUpdatableTags<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    get tagsList(): IEntityHasUpdatableTagList<T>;
    updateTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
    clearTags(options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
}

export function hasUpdatableTags<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>>(constructor: TConstructor<IResourceEntity<T>>) {
    return class HasUpdatableTags extends constructor {
        _tagList?: IEntityHasUpdatableTagList<T>;
        get tagList() {
            if (this._tagList) {
                return this._tagList;
            }
            const tagList = {
                update: this.updateTags.bind(this),
                clear: this.clearTags.bind(this)
            };
            this._tagList = tagList;
            return tagList;
        }
        updateTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            const factory = this.getFactory();
            return factory.setTagsFor([this], criteria, options);
        }
        clearTags(options?: IRequestOptions) {
            const factory = this.getFactory();
            return factory.clearTagsFor([this], options);
        }
    };
}