import {
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../../types";
import { IEmbeddedCatalogElement, IHasEmbeddedCatalogElements } from "../../CatalogElement";

export type IElementCriteria = (IEmbeddedCatalogElement)[];

export interface IHasEmbeddedCatalogElementsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    getEmbeddedCatalogElements(): IEmbeddedCatalogElement[];
    addEmbeddedCatalogElements(criteria: IElementCriteria): void;
    removeEmbeddedCatalogElements(criteria: IElementCriteria): void;
    embeddedCatalogElements: IEntityCatalogElementList<T>;
}

export interface IEntityCatalogElementList<T extends IResourceFactory<IResourceEntity<T>>> {
    get(): IEmbeddedCatalogElement[];
    add(criteria: IElementCriteria): void;
    remove(criteria: IElementCriteria): void;
}

export function hasEmbeddedCatalogElements<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedElements extends Base {
        _embedded?: IHasEmbeddedCatalogElements;
        _embeddedCatalogElements?: IEntityCatalogElementList<T>;

        get embeddedCatalogElements() {
            if (this._embeddedCatalogElements) {
                return this._embeddedCatalogElements;
            }

            this._embeddedCatalogElements = {
                get: this.getEmbeddedCatalogElements.bind(this),
                add: this.addEmbeddedCatalogElements.bind(this),
                remove: this.removeEmbeddedCatalogElements.bind(this)
            };

            return this._embeddedCatalogElements;
        }
        getEmbeddedCatalogElements() {
            return this._embedded?.catalog_elements || [];
        }
        addEmbeddedCatalogElements(criteria: IElementCriteria) {
            const embedded = this._embedded || {};
            const { catalog_elements = []} = embedded;

            const factory = this.getFactory();
            const entityCriteria = factory.getEntityCriteria<IEmbeddedCatalogElement>(criteria);
            catalog_elements.push(...entityCriteria);

            this._embedded = {
                ...embedded,
                catalog_elements
            };
        }

        removeEmbeddedCatalogElements(criteria: IElementCriteria) {
            const embedded = this._embedded || {};
            const embeddedElements = embedded.catalog_elements || [];
            const ids = criteria.map(({ id }) => id);
            const catalog_elements = embeddedElements.filter(({ id }) => !id || !ids.includes(id));

            this._embedded = {
                ...embedded,
                catalog_elements
            };
        }
    };
}