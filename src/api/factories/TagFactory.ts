/**
 * Фабрика для создания сделок {@link Tag}
 * */
import ResourceFactory from "../ResourceFactory";
import schema from '../../schema/v4';
import ResourcePagination from "../ResourcePagination";
import { IRequestOptions } from "../../interfaces/common";
import { IResourceFactory } from "../../interfaces/api";

import { hasGetByCriteria, IGetCriteria } from "./mixins/hasGetByCriteria";
import { hasGetById, IHasGetByIdCriteria } from "./mixins/hasGetById";
import { hasCreate } from "./mixins/hasCreate";
import { hasUpdate } from "./mixins/hasUpdate";
import { applyMixins } from "../../util";
import { IClientRequest } from "../../common/ClientRequest";
import { ITag, Tag } from "../activeRecords/Tag";
import { IGetTagsCriteria} from "./mixins/hasTags";
import { IClient } from "../../Client";

export interface TagCreateCriteria {
    name: string;
    color: string|null;
    request_id?: string;
}

export interface ITagFactory extends IResourceFactory<ITag> {
    /**
     * @param criteria фильтр сделок (https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-list)
     * @example
     * ```ts
     * const pagination = await client.companies.get({
     *     order: 'created_at',
     *     page: 2,
     *     query: 'Иванов'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns постраничную навигацию, экземпляр {@link ResourcePagination}
     *
     * @example
     * ```ts
     * const pagination = await client.companies.get()
     * const data = pagination.getData(); // [company, company]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Tag}
     *
     * */
    get(criteria?: IGetTagsCriteria, options?: IRequestOptions): Promise<ResourcePagination<ITag>>;
    create(criteria: (TagCreateCriteria | ITag)[], options?: IRequestOptions): Promise<ITag[]>;
}

/**
 * Фабрика управления сделками
 * */
export class BaseTagFactory extends ResourceFactory<ITag> {
    protected entityType: string;

    constructor(client: IClient, entityType: string) {
        super(client);
        this.entityType = entityType;
    }

    getEntityClass() {
        return Tag;
    }

    getBaseUrl(): string {
        return schema.apiUrl + '/' + this.entityType + '/tags';
    }

    getEmbeddedKey(): string {
        return 'tags';
    }
}

export const TagFactory = applyMixins(BaseTagFactory, [
    hasGetByCriteria,
    hasCreate,
]);
