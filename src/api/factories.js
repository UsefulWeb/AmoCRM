import LeadFactory from './factories/LeadFactory';
import ContactFactory from './factories/ContactFactory';
import CustomerFactory from './factories/CustomerFactory';
import FieldFactory from './factories/FieldFactory';
import NoteFactory from './factories/NoteFactory';
import PipelineFactory from './factories/PipelineFactory';
import TaskFactory from './factories/TaskFactory';
import CompanyFactory from './factories/CompanyFactory';
import IncomingLeadFactory from "./factories/IncomingLeadFactory";

export default {
  Lead: LeadFactory,
  Contact: ContactFactory,
  Company: CompanyFactory,
  Note: NoteFactory,
  Task: TaskFactory,
  Customer: CustomerFactory,
  IncomingLead: IncomingLeadFactory,
  Field: FieldFactory,
  Pipeline: PipelineFactory
};
