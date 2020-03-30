'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import factories from '../factories';

/**
 * @mixes CatalogElement
 */
class CatalogElement extends EntityActiveRecord {
  static behaviors = [ new Removable ];

  getCatalog() {
    const factory = factories.Catalog,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource );

    return factoryInstance.findById( this._attributes.catalog_id );
  }
}

export default CatalogElement;
