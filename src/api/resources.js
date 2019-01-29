import LeadResource from './resources/LeadResource';
import ContactResource from './resources/ContactResource';
import CompanyResource from './resources/CompanyResource';
import NoteResource from './resources/NoteResource';
import TaskResource from './resources/TaskResource';
import CustomerResource from './resources/CustomerResource';
import FieldResource from './resources/FieldResource';
import PipelineResource from './resources/PipelineResource';
import CatalogElementResource from './resources/CatalogElementResource';
import CatalogResource from './resources/CatalogResource';

export default {
  Lead: LeadResource,
  Contact: ContactResource,
  Company: CompanyResource,
  Note: NoteResource,
  Task: TaskResource,
  Customer: CustomerResource,
  Field: FieldResource,
  Pipeline: PipelineResource,
  CatalogElement: CatalogElementResource,
  Catalog: CatalogResource
};
