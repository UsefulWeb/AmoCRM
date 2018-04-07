class ResourceFactory {
  static entityClass;
  /**
   * @param resourceClass {RemoteResource}
   */
  static resourceClass;
  static responseHandlerClass;

  /**
   * @param request {AmoRequest}
   */
  constructor( request ) {
    const { responseHandlerClass, resourceClass } = this.constructor;
    /**
     * @param _resource {RemoteResource}
     */
    this._resource = new resourceClass( request, responseHandlerClass );
  }

  create( attributes={}) {
    return new this.constructor.entityClass( this._resource, attributes );
  }
}

export default ResourceFactory;
