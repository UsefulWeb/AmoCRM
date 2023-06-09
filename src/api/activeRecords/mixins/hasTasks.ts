import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import {IHasTasksFactory} from "../../factories/mixins/hasTasks";
import {EntityList, IEntityList} from "../common/EntityList";
import {ITask} from "../Task";
import {IFactoryCriteriaItem} from "../../factories/common/FactoryCriteriaBuilder";
import {ITaskFactory} from "../../factories/TaskFactory";

export interface IHasTasks<T extends IHasTasksFactory<IResourceEntity<T>>> {
    tasks: IEntityList<ITask>;
}

export class TaskEntityCriteriaItem<T extends IResourceFactory<IResourceEntity<T>>> implements IFactoryCriteriaItem {
    readonly entity: IResourceEntity<T>;

    constructor(entity: IResourceEntity<T>) {
        this.entity = entity;
    }

    fetchCriteria() {
        return {
            filter: {
                entity_id: this.entity.id
            }
        };
    }

    createCriteria() {
        return {
            entity_id: this.entity.id
        };
    }
}

export function hasTasks<T extends IHasTasksFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasTasks extends Base implements IHasTasks<T> {
        readonly tasks: IEntityList<ITask>;

        constructor(entityFactory: T) {
            super(entityFactory);

            const factory: ITaskFactory = Object.create(this.getFactory().tasks);
            const criteriaItem = new TaskEntityCriteriaItem(this);

            this.tasks = new EntityList<ITask>({
                factory,
                criteriaItem
            });
        }
    };
}