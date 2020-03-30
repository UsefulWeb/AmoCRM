import CatalogElement from '../activeRecords/CatalogElement';
import CatalogElementResource from '../resources/CatalogElementResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from '../../base/factories/behaviors/Removable';

/**
 * @mixes Removable
 */
class CatalogElementFactory extends EntityFactory {
  static activeRecordClass = CatalogElement;
  static resourceClass = CatalogElementResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable ];
}

export default CatalogElementFactory;
