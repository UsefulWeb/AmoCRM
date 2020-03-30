import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";
import hasElementTypeByKey from "../../base/resources/behaviors/static/hasElementTypeByKey";

/**
 * @mixes Removable
 * @mixes Removable
 * @mixes HasMultiactions
 */
class TaskResource extends EntityResource {
  static path = schema.entities.tasks.path;
  static deletePath = schema.entities.tasks.deletePath;
  static ENTITY_TYPE = 4;
  static NOTE_ELEMENT_TYPE = 4;
  static behaviors = [
    ...EntityResource.behaviors,
    new Removable,
    new HasMultiactions,
  ];

  static TASK_TYPES = {
    CALL: 1,
    MEETING: 2,
    MAIL: 3
  };

  static ELEMENT_TYPES = {
    CONTACT: 1,
    LEAD: 2,
    COMPANY: 3,
    CUSTOMER: 12,
  };

  static getElementType = hasElementTypeByKey( 'ELEMENT_TYPES' );
}

export default TaskResource;
