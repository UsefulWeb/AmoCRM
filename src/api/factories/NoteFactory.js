import EntityFactory from '../../base/factories/EntityFactory';
import Note from '../activeRecords/Note';
import NoteResource from '../resources/NoteResource';
import Findable from "../../base/factories/behaviors/Findable";
import Insertable from "../../base/factories/behaviors/Insertable";
import FindableById from "../../base/factories/behaviors/FindableById";
import Updatable from "../../base/factories/behaviors/Updatable";

const { afterFindById } = new FindableById;

class NoteFactory extends EntityFactory {
  static activeRecordClass = Note;
  static resourceClass = NoteResource;
  static behaviors = [ new Findable, new Insertable, new Updatable ];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = NoteResource.ELEMENT_TYPES;
    this.ELEMENT_TYPE_NAME = NoteResource.ELEMENT_TYPE_NAMES;
    this.NOTE_TYPE = NoteResource.NOTE_TYPES;

    this.CALL_STATUS = NoteResource.CALL_STATUSES;
  }

  findById( id, type ) {
    return this._resource.findById( id, type )
      .then( response => afterFindById.call( this, response ));
  }
}

export default NoteFactory;
