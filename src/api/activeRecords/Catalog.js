'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import factories from '../factories';

class Catalog extends EntityActiveRecord {
  static behaviors = [ new Removable ];

  get elements() {
    return {
      add: catalogElement => this.addCatalogElement( catalogElement ),
      get: params => this.getCatalogElements( params ),
    }
  }

  addCatalogElement( catalogElement ) {
    catalogElement.catalog_id = this._attributes.id;
    return catalogElement.save();
  }

  getCatalogElements( params ) {
    const factory = factories.CatalogElement,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      criteria = {
        ...params,
        catalog_id: this._attributes.id
      };

    return factoryInstance.find( criteria );
  }
}

export default Catalog;
