import factories from "../../../api/factories";
import NoteResource from "../../../api/resources/NoteResource";

class Notable {
  get notes() {
    return {
      add: note => this.addNote( note ),
      get: params => this.getNotes( params )
    };
  };

  addNote( note ) {
    if ( !note.isNew()) {
      throw new Error( 'note must not exists!' );
    }
    const { NOTE_ELEMENT_TYPE } = this._resource.constructor;
    note.element_type = NOTE_ELEMENT_TYPE;
    note.element_id = this._attributes.id;
    return note.save();
  }

  getNotes( params ) {
    const factory = factories.Note,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      resourceConstructor = resource.constructor,
      { NOTE_ELEMENT_TYPE } = resourceConstructor,
      type = NoteResource.getElementType( NOTE_ELEMENT_TYPE ),
      criteria = {
        ...params,
        type,
        element_id: this._attributes.id
      };

    return factoryInstance.find( criteria );
  }
}

export default Notable;
