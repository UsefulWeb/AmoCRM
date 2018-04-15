import ResourceFactory from "./ResourceFactory";
import EntityHandler from "../EntityProxyHandler";
import BaseActiveRecord from "../activeRecords/BaseActiveRecord";

class EntityFactory extends ResourceFactory {
  static entityHandlerClass = EntityHandler;

  create( attributes={}) {
    const { entityClass, entityHandlerClass } = this.constructor,
      entity = new entityClass( this._resource, attributes ),
      handler = new entityHandlerClass( entity );
    return new Proxy({}, handler );
  }

  of( attributes={}) {
    return this.create( attributes );
  }

  findById( id ) {
    return this._resource.findById( id )
      .then( response => this.afterFindById( response ));
  }

  afterFindById( response ) {
    const attributes = response.getFirstItem();
    if ( !attributes ) {
      return;
    }
    return this.create( attributes );
  }

  find( query ) {
    return this._resource.find( query )
      .then( response => {
        const items = response.getItems();
        return items.map( attributes => this.create( attributes ));
      });
  }

  insert( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.insert( data );
  }

  update( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.update( data );
  }

  getDataAttributes( data = []) {
    return data.map( item =>
      item instanceof BaseActiveRecord ? item.attributes : item
    );
  }

  getDataIdentifiers( data = []) {
    return this
      .getDataAttributes( data )
      .map(
        item => typeof item === 'object' ? item.id : item
      );
  }
}

export default EntityFactory;
