import BehaviorFactory from "../BehaviorFactory";

class ResourceFactory {
  static entityClass;
  /**
   * @param resourceClass {RemoteResource}
   */
  static resourceClass;

  static behaviors = [];

  /**
   * @param request {DomainRequest}
   */
  constructor( request ) {
    const { resourceClass } = this.constructor;
    /**
     * @param _resource {RemoteResource}
     */
    this._resource = new resourceClass( request );
    BehaviorFactory.assignBehaviors( this, this.constructor.behaviors );
  }

  static createFromResource( resource ) {
    const request = resource.getDomainRequest();

    return new this.constructor( request );
  }

  create( attributes={}) {
    return new this.constructor.entityClass( this._resource, attributes );
  }
}

export default ResourceFactory;
