import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import {TConstructor} from "../../../../types";
import {IEmbeddedTag} from "../../Tag";
import {IHasCreateAndUpdateEntity, IHasSave, IHasSaveEntity} from "../hasSave";
import {IEntityCriteriaItem} from "../../common/EntityCriteriaBuilder";
import {IHasEmbedded} from "../hasEmbedded";


export type IRequiredEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> =
    IResourceEntity<T> &
    IHasSave<T> &
    IHasEmbedded<IEmbedded<IEmbeddedTag>>;

export function hasEmbeddedSource
    <T extends IResourceFactory<IRequiredEntity<T>>>
(Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedTags extends Base {
        constructor(factory: T) {
            super(factory);
            const item = new EmbeddedSourceCriteriaItem(this);
            this.criteriaBuilder.add(item);
        }
    };
}

export class EmbeddedSourceCriteriaItem<T extends IResourceFactory<IRequiredEntity<T>>>
    implements IEntityCriteriaItem {
    protected entity: IRequiredEntity<T>;
    constructor(entity: IRequiredEntity<T>) {
        this.entity = entity;
    }
    getCreateCriteria(): object {
        return {};
    }

    getUpdateCriteria(): object {
        return {
            _embedded: {
                source: undefined
            }
        };
    }

}