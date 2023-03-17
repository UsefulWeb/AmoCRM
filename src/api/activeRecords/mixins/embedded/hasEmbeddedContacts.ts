import {
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../../types";
import { IEmbeddedContact, IHasEmbeddedContacts} from "../../Contact";

export type IContactCriteria = (IEmbeddedContact)[];

export interface IHasEmbeddedContactsEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    getContacts(): IEmbeddedContact[];
    addContacts(criteria: IContactCriteria): void;
    removeContacts(criteria: IContactCriteria): void;
    contactList: IEntityContactList<T>;
}

export interface IEntityContactList<T extends IResourceFactory<IResourceEntity<T>>> {
    get(): IEmbeddedContact[];
    add(criteria: IContactCriteria): void;
    remove(criteria: IContactCriteria): void;
}

export function hasEmbeddedContacts<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedContacts extends Base {
        _embedded?: IHasEmbeddedContacts;
        _embeddedContacts?: IEntityContactList<T>;

        get embeddedContacts() {
            if (this._embeddedContacts) {
                return this._embeddedContacts;
            }

            this._embeddedContacts = {
                get: this.getEmbeddedContacts.bind(this),
                add: this.addEmbeddedContacts.bind(this),
                remove: this.removeEmbeddedContacts.bind(this)
            };

            return this._embeddedContacts;
        }

        getEmbeddedContacts() {
            return this._embedded?.contacts || [];
        }
        addEmbeddedContacts(criteria: IContactCriteria) {
            const embedded = this._embedded || {};
            const { contacts = []} = embedded;

            const factory = this.getFactory();
            const entityCriteria = factory.getEntityCriteria<IEmbeddedContact>(criteria);
            contacts.push(...entityCriteria);

            this._embedded = {
                ...embedded,
                contacts
            };
        }

        removeEmbeddedContacts(criteria: IContactCriteria) {
            const embedded = this._embedded || {};
            const embeddedContacts = embedded.contacts || [];
            const ids = criteria.map(({ id }) => id);
            const contacts = embeddedContacts.filter(({ id }) => !id || !ids.includes(id));

            this._embedded = {
                ...embedded,
                contacts
            };
        }
    };
}