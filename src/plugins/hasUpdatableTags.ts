import { applyMixins } from "../util";
import {
    hasUpdatableTags as factoryHasUpdatableTags,
    IHasUpdatableTagsFactory,
} from "./factories/hasUpdatableTags";
import { IClientConstructors } from "../interfaces/api";
import {TConstructor} from "../types";
import {ILeadFactory} from "../api/factories/LeadFactory";
import {IContactFactory} from "../api/factories/ContactFactory";
import {ILead} from "../api/activeRecords/Lead";
import {IContact} from "../api/activeRecords/Contact";
import {IFactoryConstructors} from "../api/factories";
import {IClient} from "../Client";
import {IClientOptions} from "../interfaces/common";

export type ITaggedLeadFactory = ILeadFactory & IHasUpdatableTagsFactory<ILead>;
export type ITaggedContactFactory = IContactFactory & IHasUpdatableTagsFactory<IContact>;

export interface ITaggedFactoryConstructors extends IFactoryConstructors {
    leads: TConstructor<ITaggedLeadFactory>;
    contacts: TConstructor<ITaggedContactFactory>;
    // companies: TConstructor<ICompanyFactory>;
    // tags: TConstructor<ITagFactory>;
    // customers: TConstructor<ICustomerFactory>;
}

// export interface ITaggedEntityConstructors extends IEntityConstructors {
//     Lead: TConstructor<ITaggedLead>
// }

export interface ITaggedClientConstructors extends IClientConstructors {
    factories: ITaggedFactoryConstructors;
}

export function getTaggedConstructors(constructors: IClientConstructors): ITaggedClientConstructors {
    const mixins = [factoryHasUpdatableTags];
    const factories = {
        ...constructors.factories,
        leads: applyMixins(constructors.factories.leads, mixins),
        contacts: applyMixins(constructors.factories.contacts, mixins),
        // companies: applyMixins(constructors.factories.companies, mixins),
        // customers: applyMixins(constructors.factories.customers, mixins),
    };
    return {
        ...constructors,
        factories
    };
}

export interface ITaggedClient extends IClient {
    leads: ITaggedLeadFactory;
}

export function hasUpdatableTags(Base: TConstructor<IClient>) {
    return class ClientWithUpdatableTags extends Base implements ITaggedClient {
        public readonly leads: ITaggedLeadFactory;
        public readonly contacts: ITaggedContactFactory;

        constructor(options: IClientOptions) {
            super(options);

            const { factories } = this.constructors;
            this.leads = new factories.leads(this);
            this.contacts = new factories.contacts(this);

            this.Lead = this.assignEntity(this.leads);
            this.Contact = this.assignEntity(this.contacts);
        }
        get constructors() {
            return getTaggedConstructors(super.constructors);
        }
    };
}