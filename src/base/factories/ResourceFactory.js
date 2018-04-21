import BehaviorFactory from "../BehaviorFactory";
import ActiveRecordHandler from "../ActiveRecordHandler";

class ResourceFactory {
  static activeRecordClass;
  static activeRecordHandlerClass = ActiveRecordHandler;
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

    return new this( request );
  }

  create( attributes={}) {
    const { activeRecordClass, activeRecordHandlerClass } = this.constructor,
      entity = new activeRecordClass( this._resource, attributes ),
      handler = new activeRecordHandlerClass( entity );
    return new Proxy({}, handler );
  }

  of( attributes={}) {
    return this.create( attributes );
  }
}

export default ResourceFactory;
