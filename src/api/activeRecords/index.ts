import { ILead, Lead } from "./Lead";
import { Contact, IContact } from "./Contact";
import { Company, ICompany } from "./Company";
import { ITag, Tag } from "./Tag";
import { TConstructor } from "../../types";

export interface IEntityConstructors {
    Lead: TConstructor<ILead>,
    Contact: TConstructor<IContact>,
    Company: TConstructor<ICompany>,
    Tag: TConstructor<ITag>
}

export default {
    Lead,
    Contact,
    Company,
    Tag
};