import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import { IEmbeddedCatalogElement, IHasEmbeddedCatalogElements } from "../../CatalogElement";
import {IHasCreateAndUpdateEntity, IHasSave, IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IHasEmbedded} from "../hasEmbedded";

export interface IHasEmbeddedCatalogElementsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedCatalogElements: IEmbeddedEntityList<IEmbeddedCatalogElement>;
}

export interface IHasEmbeddedCatalogElementsOptions {
    attributes?: IQueryAttributes<IEmbeddedCatalogElement>;
}

export type IRequiredEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> =
    IResourceEntity<T> &
    IHasSave<T> &
    IHasEmbedded<IEmbedded<IEmbeddedCatalogElement>>;

export function hasEmbeddedCatalogElements(options: IHasEmbeddedCatalogElementsOptions = {}) {
    return function hasEmbeddedCatalogElementsConstructor
        <T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedElements extends Base {
            embeddedCatalogElements: IEmbeddedEntityList<IEmbeddedCatalogElement>;

            constructor(factory: T) {
                super(factory);
                this.embeddedCatalogElements = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'catalog_elements'
                });

                this.criteriaBuilder.add(this.embeddedCatalogElements);
            }
        };
    };
}