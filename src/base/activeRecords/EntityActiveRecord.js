'use strict';

import BaseActiveRecord from './BaseActiveRecord';

class EntityActiveRecord extends BaseActiveRecord {

  fetch() {
    if ( this.isNew()) {
      throw new Error( 'ActiveRecord must exists for using fetch()!' );
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
    delete this._inclomplete;
    return this;
  }

  save( newAttributes ) {
    return this.isNew() ? this.insert( newAttributes ) : this.update( newAttributes );
  }

  exists() {
    return this.fetch()
      .then( response => response !== false );
  }

  insert( newAttributes ) {
    if ( !this.isNew()) {
      throw new Error( 'EntityActiveRecord must not exists for using EntityActiveRecord.insert()!' );
    }
    Object.assign( this._attributes, newAttributes );
    return this._resource
      .insert([ this._attributes ])
      .then( response => this.afterInsert( response ));
  }

  afterInsert( response ) {
    const attributes = response.getFirstItem() || {};
    this._attributes.id = attributes.id;
    return this;
  }

  markAsIncomplete() {
    this._inclomplete = true;
  }

  update( newAttributes ) {
    if ( !this._inclomplete === false ) {
      throw new Error( 'EntityActiveRecord cannot be updated before calling fetch() method' );
    }
    if ( this.isNew()) {
      throw new Error( 'EntityActiveRecord must exists for using EntityActiveRecord.update()!' );
    }
    Object.assign( this._attributes, newAttributes );
    return this._resource
      .update([ this._attributes ])
      .then(() => this );
  }
}

export default EntityActiveRecord;
