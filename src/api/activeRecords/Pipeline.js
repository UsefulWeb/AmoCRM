'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';

class Pipeline extends Entity {
  afterInsert( response ) {
    const attributes = response.getFirstModifiedItem( 'add' ) || {};
    this._attributes.id = attributes.id;
    return this;
  }
}

export default Pipeline;
