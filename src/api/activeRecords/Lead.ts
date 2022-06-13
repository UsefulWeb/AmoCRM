/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { JSONObject } from "../../types";
import { fillable } from "./decorators/fillable";
import { IRequestOptions } from "../../interfaces/common";
import LeadFactory, { LeadsGetByIdCriteria } from "../factories/LeadFactory";

export default class Lead extends ResourceEntity<LeadFactory> {
    /**
     * Сделка
     * @decorator `@fillable`
     */
    @fillable()
    public id?: number;
    @fillable()
    public name?: string;
    @fillable()
    public price?: number;
    @fillable()
    public responsible_user_id?: number;
    @fillable()
    public group_id?: number;
    @fillable()
    public status_id?: number;
    @fillable()
    public pipeline_id?: number;
    @fillable()
    public loss_reason_id?: number;
    @fillable()
    public source_id?: number;
    @fillable()
    public created_by?: number;
    @fillable()
    public updated_by?: number;
    @fillable()
    public closed_at?: number;
    @fillable()
    public created_at?: number;
    @fillable()
    public updated_at?: number;
    @fillable()
    public closed_task_at?: number;
    @fillable()
    public is_deleted?: boolean;
    @fillable()
    public custom_fields_values?: JSONObject[] | null;
    @fillable()
    public score?: number | null;
    @fillable()
    public account_id?: number;
    @fillable()
    public is_price_modified_by_robot?: boolean;
    @fillable()
    public _embedded?: JSONObject;

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
    async create(options?: IRequestOptions) {
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
    async update(options?: IRequestOptions) {
        const criteria = [this];
        const [lead] = await this.factory.update(criteria, options);

        this.emit('update');
        return lead;
    }

    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options?: IRequestOptions) {
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
    async fetch(criteria?: LeadsGetByIdCriteria, options?: IRequestOptions) {
        if (this.isNew()) {
            return false;
        }
        const id = <number>this.id;
        const lead = await this.factory.getById(id, criteria, options);

        this.emit('fetch');
        return lead;
    }
}