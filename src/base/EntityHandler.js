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
    const result = this._entity.setAttribute( name, value );
    return Boolean( result );
  }
}

export default EntityHandler;
