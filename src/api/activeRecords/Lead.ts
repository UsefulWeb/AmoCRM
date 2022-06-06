import ResourceEntity from "../ResourceEntity";
import { JSONObject } from "../../types";
import { fillable } from "./decorators/fillable";

export default class Lead extends ResourceEntity {
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
}