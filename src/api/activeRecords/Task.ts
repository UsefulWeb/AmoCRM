import {IEntityAttributes, IResourceEntity} from "../../interfaces/api";
import {ITaskFactory} from "../factories/TaskFactory";
import ResourceEntity from "../ResourceEntity";
import {hasSave, IHasSave} from "./mixins/hasSave";
import {hasFetch, IHasFetch} from "./mixins/hasFetch";
import {TConstructor} from "../../types";
import {applyMixins} from "../../util";
import {hasCreate} from "./mixins/hasCreate";
import {hasUpdate} from "./mixins/hasUpdate";
import {hasEmbedded} from "./mixins/hasEmbedded";

export interface TaskAttributes extends IEntityAttributes {
    id?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    responsible_user_id?: number;
    group_id?: number;
    entity_id?: number;
    entity_type?: string;
    is_completed?: boolean;
    task_type_id?: number;
    text?: string;
    duration?: number;
    complete_till?: number;
    result?: ITaskResult;
    account_id?: number;
}

export interface ITaskResult {
    text?: string;
}

export type ITask = IResourceEntity<ITaskFactory> &
    TaskAttributes &
    IHasSave<ITaskFactory> &
    IHasFetch<ITaskFactory>;

/**
 * Сделка
 */
export class BaseTask extends ResourceEntity<ITaskFactory> {
    id?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    responsible_user_id?: number;
    group_id?: number;
    entity_id?: number;
    entity_type?: string;
    is_completed?: boolean;
    task_type_id?: number;
    text?: string;
    duration?: number;
    complete_till?: number;
    result?: ITaskResult;
    account_id?: number;

    public getAttributes(): TaskAttributes {
        return {
            id: this.id,
            created_by: this.created_by,
            updated_by: this.updated_by,
            created_at: this.created_at,
            updated_at: this.updated_at,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            entity_id: this.entity_id,
            entity_type: this.entity_type,
            is_completed: this.is_completed,
            task_type_id: this.task_type_id,
            text: this.text,
            duration: this.duration,
            complete_till: this.complete_till,
            result: this.result,
            account_id: this.account_id
        };
    }

    public setAttributes(attributes: TaskAttributes) {
        this.id = attributes.id;
        this.created_by = attributes.created_by;
        this.updated_by = attributes.updated_by;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.entity_id = attributes.entity_id;
        this.entity_type = attributes.entity_type;
        this.is_completed = attributes.is_completed;
        this.task_type_id = attributes.task_type_id;
        this.text = attributes.text;
        this.duration = attributes.duration;
        this.complete_till = attributes.complete_till;
        this.result = attributes.result;
        this.account_id = attributes.account_id;
    }
}

export const mixins = [
    hasCreate,
    hasUpdate,
    hasSave,
    hasFetch,
];

export const Task: TConstructor<ITask> = applyMixins(BaseTask, [
    ...mixins
]);