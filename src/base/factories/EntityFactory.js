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
