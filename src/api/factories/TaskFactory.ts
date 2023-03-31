import {IResourceFactory} from "../../interfaces/api";
import {ITask, ITaskResult, Task} from "../activeRecords/Task";
import ResourceFactory from "../ResourceFactory";
import {IClient} from "../../Client";
import schema from "../../schema/v4";
import {applyMixins} from "../../util";
import {hasGetByCriteria, IHasGetFactory} from "./mixins/hasGetByCriteria";
import {hasGetById, IHasGetByIdFactory} from "./mixins/hasGetById";
import {hasCreate, IHasCreateFactory} from "./mixins/hasCreate";
import {hasUpdate, IHasUpdateFactory} from "./mixins/hasUpdate";

export type ITaskFactory = IResourceFactory<ITask> &
    IHasGetFactory<ITask> &
    IHasGetByIdFactory<ITask> &
    IHasCreateFactory<ITask> &
    IHasUpdateFactory<ITask>;

export interface TaskCreateCriteria {
    responsible_user_id: number;
    entity_id?: number;
    entity_type?: number;
    is_completed?: boolean;
    task_type_id?: number;
    text: string;
    duration?: number;
    complete_till: number;
    result?: ITaskResult;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    request_id?: string;
}

export type TaskUpdateCriteria = TaskCreateCriteria;

/**
 * Фабрика управления сделками
 * */
export class BaseTaskFactory extends ResourceFactory<ITask> {
    protected entityType?: string;

    constructor(client: IClient, entityType?: string) {
        super(client);
        this.entityType = entityType;
    }

    getEntityClass() {
        return Task;
    }

    getBaseUrl(): string {
        return schema.entities.tasks.path;
    }

    getEmbeddedKey(): string {
        return 'tasks';
    }
}

export const mixins = [
    hasGetByCriteria,
    hasGetById,
    hasCreate,
    hasUpdate,
];

export const TaskFactory = applyMixins(BaseTaskFactory, mixins);