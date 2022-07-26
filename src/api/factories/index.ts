import { LeadFactory, ILeadFactory } from "./LeadFactory";
import { ContactFactory, IContactFactory } from "./ContactFactory";
import { CompanyFactory, ICompanyFactory } from "./CompanyFactory";
import { TagFactory, ITagFactory } from "./TagsFactory";
import { CustomerFactory, ICustomerFactory } from "./CustomerFactory";
import { TConstructor } from "../../types";

export interface IFactoryConstructors {
    leads: TConstructor<ILeadFactory>,
    contacts: TConstructor<IContactFactory>,
    companies: TConstructor<ICompanyFactory>,
    tags: TConstructor<ITagFactory>,
    customers: TConstructor<ICustomerFactory>,
}

const factories: IFactoryConstructors = {
    leads: LeadFactory,
    contacts: ContactFactory,
    companies: CompanyFactory,
    tags: TagFactory,
    customers: CustomerFactory,
};

export default factories;