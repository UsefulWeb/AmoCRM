import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor} from "../../../../types";
import {IHasCreateAndUpdateEntity, IHasSave, IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IEmbeddedLossReason} from "../../LossReason";
import {IHasEmbedded} from "../hasEmbedded";

export interface IHasEmbeddedLossReasonsEntity
<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    lossReasons: IEmbeddedEntityList<IEmbeddedLossReason>;
}

export interface IHasEmbeddedLossReasonsOptions {
    attributes?: IQueryAttributes<IEmbeddedLossReason>;
}

export type IRequiredEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> =
    IResourceEntity<T> &
    IHasSave<T> &
    IHasEmbedded<IEmbedded<IEmbeddedLossReason>>;

export function hasEmbeddedLossReasons(options: IHasEmbeddedLossReasonsOptions = {}) {
    return function hasEmbeddedLossReasonsConstructor
        <T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedTags extends Base {
            readonly embeddedLossReasons: IEmbeddedEntityList<IEmbeddedLossReason>;

            constructor(factory: T) {
                super(factory);
                this.embeddedLossReasons = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'loss_reasons',
                });

                this.criteriaBuilder.add(this.embeddedLossReasons);
            }
        };
    };
}