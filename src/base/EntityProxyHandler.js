class EntityHandler {
  /**
   * @param entity {Entity}
   */
  constructor( entity ) {
    this._entity = entity;
  }

  get( target, name ) {
    if ( this._entity[ name ]) {
      return this._entity[ name ];
    }
    return this._entity.getAttribute( name );
  }

  set( target, name, value ) {
    if ( this._entity[ name ]) {
      this._entity[ name ] = value;
      return true;
    }
    const result = this._entity.setAttribute( name, value );
    return Boolean( result );
  }
}

export default EntityHandler;
