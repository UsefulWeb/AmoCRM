import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from '../../base/resources/behaviors/PrivateRemovable';
import HasMultiactions from '../../base/resources/behaviors/HasMultiactions';

class LeadResource extends EntityResource {
  static path = schema.entities.leads.path;
  static deletePath = schema.entities.leads.deletePath;
  static ENTITY_TYPE = 2;
  static NOTE_ELEMENT_TYPE = 2;
  static TASK_ELEMENT_TYPE = 2;
  static behaviors = [ new Removable, new HasMultiactions ];
}

export default LeadResource;
