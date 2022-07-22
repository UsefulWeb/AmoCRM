import { ILeadFactory } from "../api/factories/LeadFactory";
import entities, { IEntityConstructors } from "../api/activeRecords";
import factories, { IFactoryConstructors } from "../api/factories";
import { IEntityPlugins, IFactoryPlugins, IResourceEntity, IResourceFactory } from "../interfaces/api";
import { TConstructor, TFactoryPlugin } from "../types";
import { applyMixins } from "../util";
import { IContactFactory } from "../api/factories/ContactFactory";
import { ICompanyFactory } from "../api/factories/CompanyFactory";
import { ITagFactory } from "../api/factories/TagsFactory";
import { ILead } from "../api/activeRecords/Lead";
import { IContact } from "../api/activeRecords/Contact";
import { ICompany } from "../api/activeRecords/Company";
import { ITag } from "../api/activeRecords/Tag";

export class ConstructorBuilder {
    static applyGlobalPlugins() {

    }
    static buildFactories(plugins: IFactoryPlugins = {}): IFactoryConstructors {
        const leads = this.assignPlugins<ILeadFactory>(factories.leads, plugins.leads);
        const contacts = this.assignPlugins<IContactFactory>(factories.contacts, plugins.contacts);
        const companies = this.assignPlugins<ICompanyFactory>(factories.companies, plugins.companies);
        const tags = this.assignPlugins<ITagFactory>(factories.tags, plugins.tags);
        return {
            leads,
            contacts,
            companies,
            tags,
        };
    }
    static buildEntities(plugins: IEntityPlugins = {}): IEntityConstructors {
        const leads = this.assignPlugins<ILead>(entities.Lead, plugins.leads);
        const contacts = this.assignPlugins<IContact>(entities.Contact, plugins.contacts);
        const companies = this.assignPlugins<ICompany>(entities.Company, plugins.companies);
        const tags = this.assignPlugins<ITag>(entities.Tag, plugins.tags);
        return {
            leads,
            contacts,
            companies,
            tags,
        };
    }
    static assignPlugins<T>(constructor: TConstructor<T>, plugins: TFactoryPlugin[] = []): TConstructor<T> {
        return applyMixins(constructor, plugins);
    }
}