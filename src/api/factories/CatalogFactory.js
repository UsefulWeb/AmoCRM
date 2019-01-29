import Catalog from '../activeRecords/Catalog';
import CatalogResource from '../resources/CatalogResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from '../../base/factories/behaviors/Removable';

class CatalogFactory extends EntityFactory {
  static activeRecordClass = Catalog;
  static resourceClass = CatalogResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable ];
}

export default CatalogFactory;
