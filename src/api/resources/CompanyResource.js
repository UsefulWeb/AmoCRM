import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";

class CompanyResource extends EntityResource {
  static path = schema.entities.companies.path;
  static ENTITY_TYPE = 3;
  static NOTE_ELEMENT_TYPE = 3;
  static TASK_ELEMENT_TYPE = 3;
  static behaviors = [ new Removable, new HasMultiactions ];
}

export default CompanyResource;
