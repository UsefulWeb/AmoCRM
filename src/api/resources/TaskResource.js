import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";

class TaskResource extends EntityResource {
  static path = schema.entities.tasks.path;
  static deletePath = schema.entities.tasks.deletePath;
  static ENTITY_TYPE = 4;
  static NOTE_ELEMENT_TYPE = 4;
  static behaviors = [ new Removable, new HasMultiactions ];
}

export default TaskResource;
