class ResourceFactory {
  static entityClass;
  /**
   * @param resourceClass {RemoteResource}
   */
  static resourceClass;

  /**
   * @param request {DomainRequest}
   */
  constructor( request ) {
    const { resourceClass } = this.constructor;
    /**
     * @param _resource {RemoteResource}
     */
    this._resource = new resourceClass( request );
  }

  create( attributes={}) {
    return new this.constructor.entityClass( this._resource, attributes );
  }
}

export default ResourceFactory;
