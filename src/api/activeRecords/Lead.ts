import ResourceEntity from "../ResourceEntity";
import { JSONObject } from "../../types";
import schema from '../../schema/v4';
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

    isNew() {
        return this.id !== undefined;
    }

    async create(options?: IRequestOptions) {
        const criteria = [this];
        const [lead] = await this.factory.create(criteria, options);

        this.emit('create');
        return lead;
    }

    async update(options?: IRequestOptions) {
        const criteria = [this];
        const [lead] = await this.factory.update(criteria, options);

        this.emit('update');
        return lead;
    }

    async fetch(criteria?: LeadsGetByIdCriteria, options?: IRequestOptions) {
        if (this.isNew()) {
            return false;
        }
        const lead = await this.factory.getById(this, criteria, options);

        this.emit('fetch');
        return lead;
    }
}