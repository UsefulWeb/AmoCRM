'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';

class Pipeline extends EntityActiveRecord {
  afterInsert( response ) {
    const attributes = response.getFirstModifiedItem( 'add' ) || {};
    this._attributes.id = attributes.id;
    return this;
  }
}

export default Pipeline;
