import LeadFactory from './factories/LeadFactory';
import ContactFactory from './factories/ContactFactory';
import CustomerFactory from './factories/CustomerFactory';
import FieldFactory from './factories/FieldFactory';
import NoteFactory from './factories/NoteFactory';
import PipelineFactory from './factories/PipelineFactory';
import TaskFactory from './factories/TaskFactory';
import CompanyFactory from './factories/CompanyFactory';

export default {
  Lead: LeadFactory,
  Contact: ContactFactory,
  Company: CompanyFactory,
  Note: NoteFactory,
  Task: TaskFactory

  /* TODO
  Customer: CustomerFactory,
  Field: FieldFactory,
  Note: NoteFactory,
  Pipeline: PipelineFactory,
  Task: TaskFactory
  */
};
