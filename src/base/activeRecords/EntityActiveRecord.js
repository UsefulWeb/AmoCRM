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
    return this._resource
      .findById( this._attributes.id )
      .then( response => this.afterFetch( response ));
  }

  afterFetch( response ) {
    const attributes = response.getFirstItem();
    if ( !attributes ) {
      return false;
    }
    this._attributes = attributes;
    return this;
  }

  exists() {
    return this.fetch()
      .then( response => response !== false );
  }

  insert() {
    if ( !this.isNew()) {
      throw new Error( 'EntityActiveRecord must not exists for using EntityActiveRecord.insert()!' );
    }
    return this._resource
      .insert([ this._attributes ])
      .then( response => this.afterInsert( response ));
  }

  afterInsert( response ) {
    const attributes = response.getFirstItem() || {};
    this._attributes.id = attributes.id;
    return this;
  }

  update() {
    if ( this.isNew()) {
      throw new Error( 'EntityActiveRecord must exists for using EntityActiveRecord.update()!' );
    }
    return this._resource
      .update([ this._attributes ])
      .then(() => this );
  }
}

export default EntityActiveRecord;
