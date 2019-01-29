import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/Removable";

class CatalogElementResource extends EntityResource {
  static path = schema.entities.catalogElements.path;
  static behaviors = [ ...EntityResource.behaviors, new Removable ];
}

export default CatalogElementResource;
