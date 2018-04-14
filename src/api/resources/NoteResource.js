import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";
import LeadResource from "./LeadResource";
import TaskResource from "./TaskResource";
import ContactResource from "./ContactResource";
import CustomerResource from "./CustomerResource";
import CompanyResource from "./CompanyResource";

class NoteResource extends EntityResource {
  static path = schema.entities.notes.path;
  static deletePath = schema.entities.notes.deletePath;
  static ENTITY_TYPE = 2;
  static behaviors = [ new Removable, new HasMultiactions ];

  static ELEMENT_TYPES = {
    CONTACT: ContactResource.NOTE_ELEMENT_TYPE,
    LEAD: LeadResource.NOTE_ELEMENT_TYPE,
    COMPANY: CompanyResource.NOTE_ELEMENT_TYPE,
    TASK: TaskResource.NOTE_ELEMENT_TYPE,
    CUSTOMER: CustomerResource.NOTE_ELEMENT_TYPE
  };

  static NOTE_TYPES = {
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

  static CALL_STATUSES = {
    VOICE_MESSAGE_CREATED: 1,
    CALL_LATER: 2,
    NOT_AVAILABLE: 3,
    SUCCESSFUL_CALL: 4,
    WRONG_NUMBER: 5,
    DID_NOT_GET_THROUGH: 6,
    BUSY: 7
  };

  static getElementType( value ) {
    const types = this.ELEMENT_TYPES,
      compareKey = key => types[ key ] === value,
      type = Object.keys( types ).filter( compareKey )[ 0 ];

    return type.toLowerCase();
  }

  findById( id, type ) {
    return super.find({ id, type });
  }

}

export default NoteResource;
