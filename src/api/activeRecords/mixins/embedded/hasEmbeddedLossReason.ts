import {
    IResourceEntity, IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor} from "../../../../types";
import {IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IEmbeddedLossReason} from "../../LossReason";

export interface IHasEmbeddedLossReasonsEntity
<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    lossReasons: IEmbeddedEntityList<IEmbeddedLossReason>;
}

export interface IHasEmbeddedLossReasonsOptions {
    attributes?: IQueryAttributes<IEmbeddedLossReason>;
}

export type IRequiredEntity<T extends IResourceFactory<IResourceEntity<T>>> =
    IHasSaveEntity<T> &
    IResourceEntityWithEmbedded<T, IEmbeddedLossReason>;

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