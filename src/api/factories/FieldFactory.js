import Field from '../activeRecords/Field';
import FieldResource from '../resources/FieldResource';
import ResourceFactory from '../../base/factories/ResourceFactory';
import Updatable from "../../base/factories/behaviors/Updatable";
import Insertable from "../../base/factories/behaviors/Insertable";
import Removable from "../../base/factories/behaviors/Removable";

class FieldFactory extends ResourceFactory {
  static activeRecordClass = Field;
  static resourceClass = FieldResource;
  static behaviors = [ new Updatable, new Insertable, new Removable ];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = FieldResource.ELEMENT_TYPES;
    this.TYPE = FieldResource.TYPES;
  }

  createTypedEntities( data, type ) {
    const { resourceClass } = this.constructor,
      ELEMENT_TYPE = type.slice( 0, -1 ).toUpperCase(),
      element_type = resourceClass.ELEMENT_TYPES[ ELEMENT_TYPE ];

    return Object.keys( data )
      .reduce(( target, id ) => {
        const entity = this.create( data[ id ]);
        entity.element_type = element_type;
        target.push( entity );
        return target;
      }, []);
  }

  find() {
    return this._resource.find()
      .then( data =>
        Object.keys( data )
          .reduce(( target, type ) => {
            target.push( ...this.createTypedEntities( data[ type ], type ));
            return target;
          }, [])
      );
  }
}

export default FieldFactory;
