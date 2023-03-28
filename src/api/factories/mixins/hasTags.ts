import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ITagFactory, TagCreateCriteria } from "../TagFactory";
import { IGetCriteria } from "./hasGetByCriteria";
import { ITag } from "../../activeRecords/Tag";
import { IResourcePagination } from "../../ResourcePagination";

export interface IGetTagsCriteria extends IGetCriteria {
    filter?: {
        name?: string,
        id?: number | number[]
    }
}

export interface IFactoryTagList {
    /**
     * {@link https://www.amocrm.ru/developers/content/crm_platform/tags-api#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%82%D0%B5%D0%B3%D0%BE%D0%B2-%D0%B4%D0%BB%D1%8F-%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B8 | API}
     */
    get(criteria?: IGetTagsCriteria, options?: IRequestOptions): Promise<IResourcePagination<ITag>>;
    /**
     *  {@link https://www.amocrm.ru/developers/content/crm_platform/tags-api#%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%82%D0%B5%D0%B3%D0%BE%D0%B2-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%B8%D0%BF%D0%B0-%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B8 | API}
     */
    create(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions): Promise<ITag[]>;
}

export interface IHasTagsFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    get tagList(): IFactoryTagList;
    getTags(criteria?: IGetTagsCriteria, options?: IRequestOptions): Promise<IResourcePagination<ITag>>;
    createTags(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions): Promise<ITag[]>;
}

export function hasTags<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasTags extends Base implements IResourceFactory<T> {
        private _tags?: object;
        private _tagsFactory?: ITagFactory;

        get tagList() {
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