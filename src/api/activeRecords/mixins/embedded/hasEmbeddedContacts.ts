import {
    IResourceEntity, IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import { IEmbeddedContact} from "../../Contact";
import {IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";

export interface IHasEmbeddedContactsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedContacts: IEmbeddedEntityList<IEmbeddedContact>;
}

export interface IHasEmbeddedContactsOptions {
    attributes?: IQueryAttributes<IEmbeddedContact>;
}

export type IRequiredEntity<T extends IResourceFactory<IResourceEntity<T>>> =
    IHasSaveEntity<T> &
    IResourceEntityWithEmbedded<T, IEmbeddedContact>;

export function hasEmbeddedContacts(options: IHasEmbeddedContactsOptions = {}) {
    return function hasEmbeddedContactsConstructor
        <T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedContacts extends Base {
            readonly embeddedContacts: IEmbeddedEntityList<IEmbeddedContact>;
            constructor(factory: T) {
                super(factory);
                this.embeddedContacts = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'contacts',
                });

                this.criteriaBuilder.add(this.embeddedContacts);
            }
        };
    };
}