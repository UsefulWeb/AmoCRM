import EntityFactory from '../../base/factories/EntityFactory';
import Note from '../activeRecords/Note';
import NoteResource from '../resources/NoteResource';
import Removable from '../../base/factories/behaviors/Removable';
import ContactResource from "../resources/ContactResource";
import LeadResource from "../resources/LeadResource";
import CompanyResource from "../resources/CompanyResource";
import TaskResource from "../resources/TaskResource";
import CustomerResource from "../resources/CustomerResource";

class NoteFactory extends EntityFactory {
  static entityClass = Note;
  static resourceClass = NoteResource;
  static behaviors = [ new Removable ];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = {
      CONTACT: ContactResource.NOTE_ELEMENT_TYPE,
      LEAD: LeadResource.NOTE_ELEMENT_TYPE,
      COMPANY: CompanyResource.NOTE_ELEMENT_TYPE,
      TASK: TaskResource.NOTE_ELEMENT_TYPE,
      CUSTOMER: CustomerResource.NOTE_ELEMENT_TYPE
    };

    this.NOTE_TYPE = {
      DEAL_CREATED: 1,
      CONTACT_CREATED: 2,
      DEAL_STATUS_CHANGED: 3,
      COMMON: 4,
      CALL_IN: 10,
      CALL_OUT: 11,
      COMPANY_CREATED: 12,
      TASK_RESULT: 13,
      SYSTEM: 25,
      SMS_IN: 102,
      SMS_OUT: 103
    };

    this.CALL_STATUS = {
      VOICE_MESSAGE_CREATED: 1,
      CALL_LATER: 2,
      NOT_AVAILABLE: 3,
      SUCCESSFUL_CALL: 4,
      WRONG_NUMBER: 5,
      DID_NOT_GET_THROUGH: 6,
      BUSY: 7
    };
  }
}

export default NoteFactory;
