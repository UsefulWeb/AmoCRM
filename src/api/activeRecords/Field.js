'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';

class Field extends EntityActiveRecord {

  fetch() {
    if ( this.isNew()) {
      throw new Error( 'ActiveRecord must exists for using fetch()!' );
    }
    return this._resource
      .list()
      .then( response => this.afterFetch( response ));
  }

  afterFetch( response ) {
    const fields = response.getRaw(),
      findSelf = field => field.id === this._attributes.id,
      attributes = fields.filter( findSelf )[ 0 ];
    if ( !attributes ) {
      return false;
    }
    this._attributes = attributes;
    return this;
  }
}

export default Field;
