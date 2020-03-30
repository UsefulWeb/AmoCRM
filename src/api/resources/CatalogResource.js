import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/Removable";

/**
 * @mixes Removable
 */
class CatalogResource extends EntityResource {
  static path = schema.entities.catalogs.path;
  static behaviors = [ ...EntityResource.behaviors, new Removable ];
}

export default CatalogResource;
