import factories from "../../../api/factories";

class HasFields {
  get fields() {
    return {
      add: field => this.addField( field ),
      get: params => this.getFields( params )
    };
  };

  addField( note ) {
    if ( !note.isNew()) {
      throw new Error( 'field must not exists!' );
    }
    const { ENTITY_TYPE } = this._resource.constructor;
    note.element_type = ENTITY_TYPE;
    note.element_id = this._attributes.id;
    return note.save();
  }

  getFields( params ) {
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

export default Notable;
