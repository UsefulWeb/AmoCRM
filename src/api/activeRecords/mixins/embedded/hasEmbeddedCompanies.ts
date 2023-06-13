import {
    IEmbedded,
    IResourceEntity,
    IResourceFactory
} from "../../../../interfaces/api";
import { TConstructor } from "../../../../types";
import {IEmbeddedCompany } from "../../Company";
import {IHasCreateAndUpdateEntity, IHasSave, IHasSaveEntity} from "../hasSave";
import {EmbeddedEntityList, IEmbeddedEntityList, IQueryAttributes} from "../../common/EmbeddedEntityList";
import {IHasEmbedded} from "../hasEmbedded";

export interface IHasEmbeddedCompaniesEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    embeddedCompanies: IEmbeddedEntityList<IEmbeddedCompany>;
}

export interface IHasEmbeddedTagsCompaniesOptions {
    attributes?: IQueryAttributes<IEmbeddedCompany>;
}

export type IRequiredEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> =
    IResourceEntity<T> &
    IHasSave<T> &
    IHasEmbedded<IEmbedded<IEmbeddedCompany>>;


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