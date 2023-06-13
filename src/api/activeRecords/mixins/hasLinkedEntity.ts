import {IEntityAttributes, IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import {IRequestOptions, ObjectKey, ObjectValues} from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";
import {IFactoryConstructors} from "../../factories";
import {ILinkedEntity, LinkedEntity} from "../common/LinkedEntity";
import {IFactoryCriteriaItem} from "../../factories/common/FactoryCriteriaBuilder";
import {IHasGetByIdFactory} from "../../factories/mixins/hasGetById";
import {IHasTasksFactory} from "../../factories/mixins/hasTasks";

export interface IHasLinked<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
> {
    entity_id?: number;
    entity_type?: ObjectKey<IFactoryConstructors>;
    entity: ILinkedEntity<T, L>;
}

export type IHasLinkedEntity<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
> = IResourceEntity<T> & IHasLinked<T, L>;

export function hasLinkedEntity<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasLinkedEntity extends Base implements IHasLinked<T, L> {
        readonly entity: ILinkedEntity<T, L>;
        entity_id?: number;
        entity_type?: ObjectKey<IFactoryConstructors>;

        constructor(entityFactory: T) {
            super(entityFactory);

            this.entity = new LinkedEntity<T, L>({
                entity: this
            });
        }
    };
}