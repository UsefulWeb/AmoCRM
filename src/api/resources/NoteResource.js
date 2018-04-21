import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";
import hasElementTypeByKey from "../../base/resources/behaviors/static/hasElementTypeByKey";
import Updatable from "../../base/resources/behaviors/Updatable";
import Findable from "../../base/resources/behaviors/Findable";
import FindableById from "../../base/resources/behaviors/FindableById";
import Insertable from "../../base/resources/behaviors/Insertable";

class NoteResource extends EntityResource {
  static path = schema.entities.notes.path;
  static deletePath = schema.entities.notes.deletePath;
  static ENTITY_TYPE = 2;
  static behaviors = [ new Findable, new Updatable, new Insertable, new HasMultiactions ];

  static ELEMENT_TYPES = {
    CONTACT: 1,
    LEAD: 2,
    COMPANY: 3,
    TASK: 4,
    CUSTOMER: 5
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

  static getElementType = hasElementTypeByKey( 'ELEMENT_TYPES' );

  findById( id, type ) {
    return this.find({ id, type });
  }

}

export default NoteResource;
