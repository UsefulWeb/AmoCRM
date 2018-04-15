import EntityFactory from '../../base/factories/EntityFactory';
import Note from '../activeRecords/Note';
import NoteResource from '../resources/NoteResource';

class NoteFactory extends EntityFactory {
  static entityClass = Note;
  static resourceClass = NoteResource;
  static behaviors = [];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = NoteResource.ELEMENT_TYPES;

    this.NOTE_TYPE = NoteResource.NOTE_TYPES;

    this.CALL_STATUS = NoteResource.CALL_STATUSES;
  }

  findById( id, type ) {
    return this._resource.findById( id, type )
      .then( response => this.afterFindById( response ));
  }
}

export default NoteFactory;
