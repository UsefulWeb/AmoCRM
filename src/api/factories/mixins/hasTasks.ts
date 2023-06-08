import {IResourceEntity, IResourceFactory, ITimestampRangeCriteria} from "../../../interfaces/api";
import { TFactoryConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import {ITaskFactory, TaskCreateCriteria, TaskUpdateCriteria} from "../TaskFactory";
import { IGetCriteria } from "./hasGetByCriteria";
import { ITask } from "../../activeRecords/Task";
import { IResourcePagination } from "../../ResourcePagination";
import {IClient} from "../../../Client";
import {getEntityFactory} from "../common/getEntityFactory";
import {IFactoryCriteriaItem} from "../common/FactoryCriteriaBuilder";

export interface IGetTasksCriteria extends IGetCriteria {
    filter?: {
        id?: number | number[],
        updated_at?: number | ITimestampRangeCriteria;
    }
}

export interface IFactoryTaskList {
    get(criteria?: IGetTasksCriteria, options?: IRequestOptions): Promise<IResourcePagination<ITask>>;
    create(criteria: (TaskCreateCriteria | ITask)[], options?: IRequestOptions): Promise<ITask[]>;
}

export interface IHasTasks<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    tasks: ITaskFactory;
}

export type IHasTasksFactory<T extends IResourceEntity<IResourceFactory<T>>> = IResourceFactory<T> & IHasTasks<T>;

export class HasTasksFactoryCriteriaItem implements IFactoryCriteriaItem {

    protected entityType: string;

    constructor(entityType: string) {
        this.entityType = entityType;
    }

    fetchCriteria() {
        return {
            entity_type: this.entityType
        };
    }

    createCriteria() {
        return {
            entity_type: this.entityType
        };
    }

    updateCriteria() {
        return {
            entity_type: this.entityType
        };
    }
}

export function hasTasks<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class HasTasks extends Base implements IResourceFactory<T>, IHasTasks<T> {
        readonly tasks: ITaskFactory;

        constructor(client: IClient) {
            super(client);

            const tasks = <ITaskFactory>getEntityFactory({
                factory: this,
                type: 'tasks'
            });

            const entityType = this.getEmbeddedKey();
            const criteriaItem = new HasTasksFactoryCriteriaItem(entityType);

            tasks.criteriaBuilder.add(criteriaItem);
            this.tasks = tasks;
        }
    };
}