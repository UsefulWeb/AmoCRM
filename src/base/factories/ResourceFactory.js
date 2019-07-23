import BehaviorFactory from "../BehaviorFactory";
import ActiveRecordHandler from "../ActiveRecordHandler";
import EntityTarget from "../EntityTarget";

class ResourceFactory {
  static activeRecordClass;
  static activeRecordHandlerClass = ActiveRecordHandler;
  static entityTargetClass = EntityTarget;
  /**
   * @param resourceClass {RemoteResource}
   */
  static resourceClass;

  static behaviors = [];

  /**
   * @param connection {AmoConnection}
   */
  constructor( connection ) {
    const { resourceClass } = this.constructor;
    /**
     * @param _resource {RemoteResource}
     */
    this._resource = new resourceClass( connection );
    BehaviorFactory.assignBehaviors( this, this.constructor.behaviors );
  }

  static createFromResource( resource ) {
    return new this( resource.connection );
  }

  create( attributes={}) {
    const { activeRecordClass, activeRecordHandlerClass, entityTargetClass } = this.constructor,
      entity = new activeRecordClass( this._resource, attributes ),
      handler = new activeRecordHandlerClass( entity ),
      type = activeRecordClass.name,
      entityTarget = new entityTargetClass( type );
    return new Proxy( entityTarget, handler );
  }

  of( attributes={}) {
    return this.create( attributes );
  }

  from( items={}) {
    return items.map( item => this.of( item ));
  }
}

export default ResourceFactory;
