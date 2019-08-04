import factories from "../../../api/factories";
import NoteResource from "../../../api/resources/NoteResource";

class HasNotes {

  get Note() {
    console.log( this );
    if ( this.isNew()) {
      throw new Error( 'record must exists!' );
    }
    const behavior = this;
    return function ( attributes={}) {
      const Note = factories.Note.createFromResource( behavior._resource ),
        note = Note.create( attributes );
      return behavior.prepareNote( note );
    }
  }

  addNotes( notes ) {
    const { factory } = notes[ 0 ],
      data = notes.map( note => this.prepareNote( note ));
    return factory.insert( data );
  }

  prepareNote( note ) {
    if ( !note.isNew()) {
      throw new Error( 'note must not exists!' );
    }
    const { NOTE_ELEMENT_TYPE } = this._resource.constructor;
    note.element_type = NOTE_ELEMENT_TYPE;
    note.element_id = this._attributes.id;
    return note;
  }

  getNotes( params={}) {
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

export default HasNotes;
