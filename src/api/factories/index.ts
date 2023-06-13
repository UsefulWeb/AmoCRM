import { LeadFactory, ILeadFactory } from "./LeadFactory";
import { ContactFactory, IContactFactory } from "./ContactFactory";
import { CompanyFactory, ICompanyFactory } from "./CompanyFactory";
import { TagFactory, ITagFactory } from "./TagFactory";
import { CustomerFactory, ICustomerFactory } from "./CustomerFactory";
import { TConstructor } from "../../types";
import {ITaskFactory, TaskFactory} from "./TaskFactory";

export interface IFactoryConstructors {
    leads: TConstructor<ILeadFactory>,
    contacts: TConstructor<IContactFactory>,
    companies: TConstructor<ICompanyFactory>,
    tags: TConstructor<ITagFactory>,
    customers: TConstructor<ICustomerFactory>,
    tasks: TConstructor<ITaskFactory>
}

const factories: IFactoryConstructors = {
    leads: LeadFactory,
    contacts: ContactFactory,
    companies: CompanyFactory,
    tags: TagFactory,
    customers: CustomerFactory,
    tasks: TaskFactory
};

export default factories;