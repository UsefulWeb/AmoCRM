import {
    IResourceEntity, IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import { IEmbeddedCatalogElement, IHasEmbeddedCatalogElements } from "../../CatalogElement";
import {IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";

export interface IHasEmbeddedCatalogElementsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedCatalogElements: IEmbeddedEntityList<IEmbeddedCatalogElement>;
}

export interface IHasEmbeddedCatalogElementsOptions {
    attributes?: IQueryAttributes<IEmbeddedCatalogElement>;
}

export type IRequiredEntity<T extends IResourceFactory<IResourceEntity<T>>> =
    IHasSaveEntity<T> &
    IResourceEntityWithEmbedded<T, IEmbeddedCatalogElement>;

export function hasEmbeddedCatalogElements(options: IHasEmbeddedCatalogElementsOptions = {}) {
    return function hasEmbeddedCatalogElementsConstructor
        <T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedElements extends Base {
            _embedded?: IHasEmbeddedCatalogElements;
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