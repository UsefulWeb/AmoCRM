import NoteFactory from "../../../api/factories/NoteFactory";

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
    const factory = NoteFactory.createFromResource( this._resource ),
      criteria = {
        ...params,
        element_id: this.id
      };

    return factory.find( criteria );
  }
}

export default Notable;
