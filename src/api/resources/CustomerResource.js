import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/Removable";

class CustomerResource extends EntityResource {
  static path = schema.entities.customers.path;
  static deletePath = schema.entities.customers.deletePath;
  static NOTE_ELEMENT_TYPE = 12;
  static TASK_ELEMENT_TYPE = 12;
  static behaviors = [ new Removable ];
}

export default CustomerResource;
