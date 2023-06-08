import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import {IHasTasksFactory} from "../../factories/mixins/hasTasks";
import {EntityList, IEntityList} from "../common/EntityList";
import {ITask} from "../Task";
import {IEntityCriteriaItem} from "../common/EntityCriteriaBuilder";
import {IFactoryCriteriaItem} from "../../factories/common/FactoryCriteriaBuilder";

export interface IHasTasks<T extends IHasTasksFactory<IResourceEntity<T>>> {
    tasks: IEntityList<ITask>;
}

export class TaskEntityCriteriaItem<T extends IResourceFactory<IResourceEntity<T>>> implements IFactoryCriteriaItem {
    readonly entity: IResourceEntity<T>;

    constructor(entity: IResourceEntity<T>) {
        this.entity = entity;
    }

    protected check() {
        if (this.entity.isNew()) {
            throw new Error('entity must exists!');
        }
    }

    fetchCriteria() {
        this.check();
        return {
            filter: {
                entity_id: this.entity.id
            }
        };
    }

    createCriteria() {
        this.check();
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

            const factory = this.getFactory().tasks;
            const criteriaItem = new TaskEntityCriteriaItem(this);

            this.tasks = new EntityList({
                factory,
                criteriaItem
            });
        }
    };
}