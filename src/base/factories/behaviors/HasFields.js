import factories from "../../../api/factories";

class HasFields {

  get Field() {
    const factory = this,
      { _resource } = this;
    return function ( attributes={}) {
      const Field = factories.Field.createFromResource( _resource ),
        field = Field.create( attributes );
      return factory.prepareField( field );
    }
  }

  addFields( fields ) {
    const { factory } = fields[ 0 ],
      data = fields.map( field => this.prepareField( field ));
    return factory.insert( data );
  }

  prepareField( field ) {
    if ( !field.isNew()) {
      throw new Error( 'field must not exists!' );
    }
    const { ENTITY_TYPE } = this._resource.constructor;
    field.element_type = ENTITY_TYPE;
    return field;
  }

  getFields( params={}) {
    const factory = factories.Field,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      { ENTITY_TYPE: element_type } = resource.constructor,
      criteria = {
        ...params,
        element_type,
      };

    return factoryInstance.find( criteria );
  }
}

export default HasFields;
