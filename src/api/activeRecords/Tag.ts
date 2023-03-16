/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { applyMixins } from "../../util";
import { hasCreate } from "./mixins/hasCreate";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";
import { ITagFactory } from "../factories/TagFactory";

export interface TagAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
    color?: string;
}
export interface IEmbeddedTag {
    id?: number;
    name?: string;
    color?: string;
}

export interface IHasEmbeddedTags {
    tags?: IEmbeddedTag[];
}
export interface ITag extends IResourceEntity<ITagFactory>, TagAttributes {
    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const company = new client.Company({
     *     name: "Walter White"
     * });
     * await company.create();
     * ```
     * @example
     * ```ts
     * const company = new client.Company;
     * company.name = "Walter White";
     * await company.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    create(options?: IRequestOptions): Promise<ITag>;
    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const company = await client.companies.getById(123);
     * company.name = "Walter White";
     * await company.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    update(options?: IRequestOptions): Promise<ITag>;
    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions): Promise<ITag>;
    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const company = new client.Company({ id: 123 });
     * await company.fetch();
     * ```
     * */
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<ITag>;
}

/**
 * Сделка
 */
export class BaseTag extends ResourceEntity<ITagFactory> {
    id?: number;
    name?: string;
    color?: string;

    getAttributes(): TagAttributes {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
        };
    }

    setAttributes(attributes: TagAttributes = {}): void {
        this.id = attributes.id;
        this.name = attributes.name;
        this.color = attributes.color;
    }
}

export const Tag: TConstructor<ITag> = applyMixins(BaseTag, [
    hasCreate
]);