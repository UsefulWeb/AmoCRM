import {
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../../types";
import {IEmbeddedCompany, IHasEmbeddedCompanies} from "../../Company";

export type ICompanyCriteria = (IEmbeddedCompany)[];

export interface IHasEmbeddedCompaniesEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    getEmbeddedCompanies(): IEmbeddedCompany[];
    addEmbeddedCompanies(criteria: ICompanyCriteria): void;
    removeEmbeddedCompanies(criteria: ICompanyCriteria): void;
    embeddedCompanies: IEntityCompanyList<T>;
}

export interface IEntityCompanyList<T extends IResourceFactory<IResourceEntity<T>>> {
    get(): IEmbeddedCompany[];
    add(criteria: ICompanyCriteria): void;
    remove(criteria: ICompanyCriteria): void;
}

export function hasEmbeddedCompanies<T extends IResourceFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbeddedCompanies extends Base {
        _embedded?: IHasEmbeddedCompanies;
        _embeddedCompanies?: IEntityCompanyList<T>;

        get embeddedCompanies() {
            if (this._embeddedCompanies) {
                return this._embeddedCompanies;
            }

            this._embeddedCompanies = {
                get: this.getEmbeddedContacts.bind(this),
                add: this.addEmbeddedCompanies.bind(this),
                remove: this.removeEmbeddedCompanies.bind(this)
            };

            return this._embeddedCompanies;
        }
        getEmbeddedContacts() {
            return this._embedded?.companies || [];
        }
        addEmbeddedCompanies(criteria: ICompanyCriteria) {
            const embedded = this._embedded || {};
            const { companies = []} = embedded;

            const factory = this.getFactory();
            const entityCriteria = factory.getEntityCriteria<IEmbeddedCompany>(criteria);
            companies.push(...entityCriteria);

            this._embedded = {
                ...embedded,
                companies
            };
        }

        removeEmbeddedCompanies(criteria: ICompanyCriteria) {
            const embedded = this._embedded || {};
            const embeddedCompanies = embedded.companies || [];
            const ids = criteria.map(({ id }) => id);
            const companies = embeddedCompanies.filter(({ id }) => !id || !ids.includes(id));

            this._embedded = {
                ...embedded,
                companies
            };
        }
    };
}