'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import NoteResource from "../resources/NoteResource";
import HasElementByField from "../../base/activeRecords/behaviors/HasElementByField";

class Note extends EntityActiveRecord {
  static behaviors = [ new HasElementByField( 'NOTE_ELEMENT_TYPE' )];
  fetch() {
    const type = NoteResource.getElementType( this._attributes.element_type ),
      { id } = this._attributes;
    if ( this.isNew()) {
      throw new Error( 'EntityActiveRecord must exists for using EntityActiveRecord.fetch()!' );
    }
    return this._resource
      .findById( id, type )
      .then( response => this.afterFetch( response ));
  }

  findById( id, type ) {
    return this._resource.findById( id, type );
  }
}

export default Note;
