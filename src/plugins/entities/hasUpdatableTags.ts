import { IResourceEntity } from "../../interfaces/api";
import { TConstructor } from "../../types";
import { ITag, TagAttributes } from "../../api/activeRecords/Tag";
import { IRequestOptions } from "../../interfaces/common";
import { IHasUpdatableTagsFactory } from "../factories/hasUpdatableTags";
import { IHasTagsFactory } from "../../api/factories/mixins/hasTags";

export function hasUpdatableTags<T extends IHasUpdatableTagsFactory<IResourceEntity<T>>>(constructor: TConstructor<IResourceEntity<T>>) {
    return class HasUpdatableTags extends constructor {
        updateTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            const factory = this.getFactory();
            return factory.updateTagsFor([this], criteria, options);
        }
        removeTagsFor(criteria: (TagAttributes | ITag)[] | null, options?: IRequestOptions) {
            return this.updateTagsFor(criteria, options);
        }
    };
}