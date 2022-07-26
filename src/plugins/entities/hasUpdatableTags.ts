import { IResourceEntity } from "../../interfaces/api";
import { TConstructor } from "../../types";
import { ITag, TagAttributes } from "../../api/activeRecords/Tag";
import { IRequestOptions } from "../../interfaces/common";
import { IHasUpdatableTagsFactory } from "../factories/hasUpdatableTags";

export interface IEntityHasUpdatableTagList<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>> {
    set(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
    clear(options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
}

export interface IEntityHasUpdatableTags<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    get tagsList(): IEntityHasUpdatableTagList<T>;
    setTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
    clearTags(options?: IRequestOptions): Promise<IResourceEntity<T>[]>;
}

export function hasUpdatableTags<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>>(constructor: TConstructor<IResourceEntity<T>>) {
    return class HasUpdatableTags extends constructor {
        _tagList?: IEntityHasUpdatableTagList<T>;
        get tagList() {
            const tagList = {
                set: this.setTags.bind(this),
                clear: this.clearTags.bind(this)
            };
            this._tagList = tagList;
            return tagList;
        }
        setTags(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            const factory = this.getFactory();
            return factory.setTagsFor([this], criteria, options);
        }
        clearTags(options?: IRequestOptions) {
            const factory = this.getFactory();
            return factory.clearTagsFor([this], options);
        }
    };
}