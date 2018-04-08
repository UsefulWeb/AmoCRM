'use strict';

import ActiveRecord from './BaseActiveRecord';

class EntityActiveRecord extends ActiveRecord {
  save() {
    return this.isNew() ? this.insert() : this.update();
  }

  fetch() {
    if ( this.isNew()) {
      throw new Error( 'EntityActiveRecord must exists for using EntityActiveRecord.fetch()!' );
    }
    if ( this.isRemoved()) {
      throw new Error( 'You cannot fetch deleted resource!' );
    }
    return this._resource
      .findById( this._attributes.id )
      .then( response => {
        this._attributes = response.getFirstItem();
        return this;
      });
  }

  insert() {
    return this._resource
      .insert([ this._attributes ])
      .then( response => {
        const attributes = response.getFirstItem();
        this._attributes.id = attributes.id;
        return this;
      });
  }

  update() {
    return this._resource
      .update([ this._attributes ])
      .then(() => this );
  }

  remove() {
    return this._resource
      .remove([ this._attributes.id ])
      .then(() => {
        this._isRemoved = true;
        return this;
      });
  }
}

export default EntityActiveRecord;
