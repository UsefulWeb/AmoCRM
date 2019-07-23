import schema from '../../apiUrls';
import RemoteResource from "../../base/resources/RemoteResource";
import Removable from '../../base/resources/behaviors/Removable';
import Updatable from '../../base/resources/behaviors/Updatable';
import Insertable from '../../base/resources/behaviors/Insertable';
import Findable from "./behaviors/Field/Findable";
import hasElementTypeByKey from "../../base/resources/behaviors/static/hasElementTypeByKey";
import EntityResponseHandler from "../../base/responseHandlers/EntityResponseHandler";

class FieldResource extends RemoteResource {
  static path = schema.entities.fields.path;
  static getPath = schema.account;
  static deletePath = schema.entities.fields.path;
  static responseHandlerClass = EntityResponseHandler;
  static behaviors = [ new Removable, new Updatable, new Insertable, new Findable ];

  static ELEMENT_TYPES = {
    CONTACT: 1,
    LEAD: 2,
    COMPANY: 3,
    CUSTOMER: 12
  };

  static TYPES = {
    TEXT: 1,
    NUMERIC: 2,
    CHECKBOX: 3,
    SELECT: 4,
    MULTISELECT: 5,
    DATE: 6,
    URL: 7,
    MULTITEXT: 8,
    TEXTAREA: 9,
    RADIOBUTTON: 10,
    STREETADDRESS: 11,
    SMART_ADDRESS: 12,
    BIRTHDAY: 13,
  };

  static getElementType = hasElementTypeByKey( 'ELEMENT_TYPES' );
  static getType = hasElementTypeByKey( 'TYPES' );
}

export default FieldResource;
