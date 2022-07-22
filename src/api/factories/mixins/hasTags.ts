import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ITagFactory, TagCreateCriteria } from "../TagsFactory";
import { IGetCriteria } from "./hasGetByCriteria";
import { ITag } from "../../activeRecords/Tag";
import ResourcePagination from "../../ResourcePagination";

export interface IGetTagsCriteria extends IGetCriteria {
    filter?: {
        name?: string,
        id?: number | number[]
    }
}

export interface ITagsManager {
    get(criteria?: IGetTagsCriteria, options?: IRequestOptions): Promise<ResourcePagination<ITag>>;
    create(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions): Promise<ITag[]>;
}

export interface IHasTagsFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    get tags(): ITagsManager;
    getTags(criteria?: IGetTagsCriteria, options?: IRequestOptions): Promise<ResourcePagination<ITag>>;
    createTags(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions): Promise<ITag[]>;
}

export function hasTags<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasTags extends Base implements IResourceFactory<T> {
        private _tags?: object;
        private _tagsFactory?: ITagFactory;

        get tags() {
            if (this._tags) {
                return this._tags;
            }
            this._tags = {
                get: this.getTags.bind(this),
                create: this.createTags.bind(this),
            };
            return this._tags;
        }

        protected getTagsFactory(): ITagFactory {
            if (this._tagsFactory !== undefined) {
                return this._tagsFactory;
            }
            const entityType = this.getEmbeddedKey();
            const client = this.getClient();
            const constructors = client.getFactoryConstructors();
            const factory = new constructors.tags(client, entityType);
            this._tagsFactory = factory;
            return factory;
        }

        getTags(criteria?: IGetTagsCriteria, options?: IRequestOptions) {
            const factory = this.getTagsFactory();
            return factory.get(criteria, options);
        }

        createTags(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions) {
            const factory = this.getTagsFactory();
            return factory.create(criteria, options);
        }
    };
}