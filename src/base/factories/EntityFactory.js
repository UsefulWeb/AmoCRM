import ResourceFactory from './ResourceFactory';
import BaseActiveRecord from '../activeRecords/BaseActiveRecord';
import Findable from "./behaviors/Findable";
import FindableById from "./behaviors/FindableById";
import Insertable from "./behaviors/Insertable";
import Updatable from "./behaviors/Updatable";

class EntityFactory extends ResourceFactory {

  static behaviors = [ new Findable, new FindableById, new Insertable, new Updatable ];

  getDataAttributes( data = []) {
    return data.map( item =>
      BaseActiveRecord.isActiveRecord( item ) ? item.attributes : item
    );
  }

  updateActiveRecords( items = [], newData ) {
    items.forEach(( item, index ) => {
      if ( !BaseActiveRecord.isActiveRecord( item )) {
        return false;
      }
      const attributes = newData[ index ];
      item.attributes = attributes;
    });
    return items;
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
