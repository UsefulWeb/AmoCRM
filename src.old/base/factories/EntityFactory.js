import ResourceFactory from "./ResourceFactory";
import EntityHandler from "../EntityProxyHandler";
import EntityTarget from "../EntityTarget";

class EntityFactory extends ResourceFactory {
  static entityHandlerClass = EntityHandler;
  static entityTargetClass = EntityTarget;

  create( attributes={}) {
    const { entityClass, entityHandlerClass, entityTargetClass } = this.constructor,
      entity = new entityClass( this._resource, attributes ),
      handler = new entityHandlerClass( entity );
    return new Proxy( new entityTargetClass( entityClass.name ), handler );
  }

  of( attributes={}) {
    return this.create( attributes );
  }

  findById( id ) {
    return this._resource.findById( id )
      .then( response => {
        const attributes = response.getFirstItem();
        return this.create( attributes );
      });
  }

  find( query ) {
    return this._resource.find( query )
      .then( response => {
        const items = response.getItems();
        return items.map( attributes => this.create( attributes ));
      });
  }

  insert( data ) {
    return this._resource.insert( data );
  }

  update( data ) {
    return this._resource.update( data );
  }

  remove( data ) {
    return this._resource.remove( data );
  }
}

export default EntityFactory;
