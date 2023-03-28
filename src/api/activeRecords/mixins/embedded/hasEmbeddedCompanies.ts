import {
    IResourceEntity, IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import {IEmbeddedCompany } from "../../Company";
import {IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";

export interface IHasEmbeddedCompaniesEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedCompanies: IEmbeddedEntityList<IEmbeddedCompany>;
}

export interface IHasEmbeddedTagsCompaniesOptions {
    attributes?: IQueryAttributes<IEmbeddedCompany>;
}

export type IRequiredEntity<T extends IResourceFactory<IResourceEntity<T>>> =
    IHasSaveEntity<T> &
    IResourceEntityWithEmbedded<T, IEmbeddedCompany>;


export function hasEmbeddedCompanies(options: IHasEmbeddedTagsCompaniesOptions = {}) {
    return function hasEmbeddedCompaniesConstructor<T extends IResourceFactory<IRequiredEntity<T>>>
    (Base: TConstructor<IRequiredEntity<T>>): TConstructor<IResourceEntity<T>> {
        return class HasEmbeddedCompanies extends Base {
            readonly embeddedCompanies: IEmbeddedEntityList<IEmbeddedCompany>;

            constructor(factory: T) {
                super(factory);
                this.embeddedCompanies = new EmbeddedEntityList({
                    ...options,
                    entity: this,
                    embeddedType: 'companies'
                });

                this.criteriaBuilder.add(this.embeddedCompanies);
            }
        };
    };
}