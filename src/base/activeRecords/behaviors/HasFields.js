import factories from "../../../api/factories";

class HasFields {

  get Field() {
    if ( this.isNew()) {
      throw new Error( 'record must exists!' );
    }
    const behavior = this;
    return function ( attributes={}) {
      const Field = factories.Field.createFromResource( behavior._resource ),
        field = Field.create( attributes );
      return behavior.prepareField( field );
    }
  }

  get fields() {
    return {
      create: attributes => new this.Field( attributes ),
      add: fields => this.addFields( fields ),
      get: params => this.getFields( params )
    };
  };

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
    field.element_id = this._attributes.id;
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
