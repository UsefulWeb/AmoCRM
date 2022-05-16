'use strict';

import BaseActiveRecord from '../../base/activeRecords/BaseActiveRecord';

class Field extends BaseActiveRecord {

  find( query ) {
    return this._resource.find( query )
      .then( response => response.getRaw());
  }
}

export default Field;
