import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";
import Filterable from "../../base/resources/behaviors/Filterable";

class ContactResource extends EntityResource {
  static path = schema.entities.contacts.path;
  static deletePath = schema.entities.contacts.deletePath;
  static filterPath = schema.entities.contacts.filter;
  static ENTITY_TYPE = 17;
  static NOTE_ELEMENT_TYPE = 1;
  static TASK_ELEMENT_TYPE = 1;
  static behaviors = [ ...EntityResource.behaviors, new Removable, new HasMultiactions, new Filterable ];
}

export default ContactResource;
