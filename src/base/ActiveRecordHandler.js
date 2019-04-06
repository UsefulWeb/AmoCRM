class ActiveRecordHandler {
  /**
   * @param entity {EntityActiveRecord}
   */
  constructor( entity ) {
    this._entity = entity;
  }

  get( target, name ) {
    if ( this._entity[ name ]) {
      return this._entity[ name ];
    }
    if ( this._entity.hasAttribute( name )) {
      return this._entity.getAttribute( name );
    }
  }

  set( target, name, value ) {
    if ( this._entity[ name ]) {
      this._entity[ name ] = value;
      return true;
    }
    const result = this._entity.setAttribute( name, value );
    return Boolean( result );
  }

  deleteProperty( target, name ) {
    if ( this._entity[ name ]) {
      delete this._entity[ name ];
      return true;
    }
    this._entity.removeAttribute( name );
    return true;
  }
}

export default ActiveRecordHandler;
