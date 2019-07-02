class ResourceFactory {
  static entityClass;
  /**
   * @param resourceClass {RemoteResource}
   */
  static resourceClass;

  /**
   * @param connection {AmoConnection}
   */
  constructor( connection ) {
    const { resourceClass } = this.constructor;
    /**
     * @param _resource {RemoteResource}
     */
    this._resource = new resourceClass( connection );
  }

  create( attributes={}) {
    return new this.constructor.entityClass( this._resource, attributes );
  }
}

export default ResourceFactory;
