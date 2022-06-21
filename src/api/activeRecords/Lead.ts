/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import LeadFactory, { LeadCreateResult, LeadsGetByIdCriteria, LeadUpdateResult } from "../factories/LeadFactory";
import { CollectionResponse, IEntityAttributes } from "../../interfaces/api";

export interface LeadAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
    price?: number;
    responsible_user_id?: number;
    group_id?: number;
    status_id?: number;
    pipeline_id?: number;
    loss_reason_id?: number;
    source_id?: number;
    created_by?: number;
    updated_by?: number;
    closed_at?: number;
    created_at?: number;
    updated_at?: number;
    closed_task_at?: number;
    is_deleted?: boolean;
    custom_fields_values?: JSONObject[] | null;
    score?: number | null;
    account_id?: number;
    is_price_modified_by_robot?: boolean;
    _embedded?: JSONObject;
}

/**
 * Сделка
 */
export default class Lead extends ResourceEntity<LeadFactory, LeadAttributes> {
    id?: number;
    name?: string;
    price?: number;
    responsible_user_id?: number;
    group_id?: number;
    status_id?: number;
    pipeline_id?: number;
    loss_reason_id?: number;
    source_id?: number;
    created_by?: number;
    updated_by?: number;
    closed_at?: number;
    created_at?: number;
    updated_at?: number;
    closed_task_at?: number;
    is_deleted?: boolean;
    custom_fields_values?: JSONObject[] | null;
    score?: number | null;
    account_id?: number;
    is_price_modified_by_robot?: boolean;
    _embedded?: JSONObject;

    public getAttributes(): LeadAttributes {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            status_id: this.status_id,
            pipeline_id: this.pipeline_id,
            loss_reason_id: this.loss_reason_id,
            source_id: this.source_id,
            created_by: this.created_by,
            updated_at: this.updated_at,
            closed_task_at: this.closed_task_at,
            is_deleted: this.is_deleted,
            custom_fields_values: this.custom_fields_values,
            score: this.score,
            account_id: this.account_id,
            is_price_modified_by_robot: this.is_price_modified_by_robot,
            _embedded: this._embedded
        };
    }

    public setAttributes(attributes: LeadAttributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.price = attributes.price;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.status_id = attributes.status_id;
        this.pipeline_id = attributes.pipeline_id;
        this.loss_reason_id = attributes.loss_reason_id;
        this.source_id = attributes.source_id;
        this.created_by = attributes.created_by;
        this.updated_by = attributes.updated_by;
        this.closed_task_at = attributes.closed_task_at;
        this.is_deleted = attributes.is_deleted;
        this.custom_fields_values = attributes.custom_fields_values;
        this.score = attributes.score;
        this.account_id = attributes.account_id;
        this.is_price_modified_by_robot = attributes.is_price_modified_by_robot;
        this._embedded = attributes._embedded;
    }

    /**
     * @returns присутствует ли сущность на портале AmoCRM
     * */
    isNew() {
        return this.id !== undefined;
    }

    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const lead = new client.Lead({
     *     name: "Walter White"
     * });
     * await lead.create();
     * ```
     * @example
     * ```ts
     * const lead = new client.Lead;
     * lead.name = "Walter White";
     * await lead.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    async create(options?: IRequestOptions<CollectionResponse<LeadCreateResult>>) {
        const criteria = [this];
        const [lead] = await this.factory.create(criteria, options);

        this.emit('create');
        return lead;
    }

    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = await client.leads.getById(123);
     * lead.name = "Walter White";
     * await lead.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    async update(options?: IRequestOptions<CollectionResponse<LeadUpdateResult>>) {
        const criteria = [this];
        const [lead] = await this.factory.update(criteria, options);

        this.emit('update');
        return lead;
    }

    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions<never>) {
        if (this.isNew()) {
            return this.create(options);
        }
        return this.update(options);
    }

    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = new client.Lead({ id: 123 });
     * await lead.fetch();
     * ```
     * */
    async fetch(criteria?: LeadsGetByIdCriteria, options?: IRequestOptions<Lead>) {
        if (this.isNew()) {
            return false;
        }
        const id = <number>this.id;
        const lead = await this.factory.getById(id, criteria, options);

        this.emit('fetch');
        return lead;
    }
}