import EntityFactory from '../../base/factories/EntityFactory';
import Note from '../activeRecords/Note';
import NoteResource from '../resources/NoteResource';
import Removable from '../../base/factories/behaviors/Removable';
import ContactResource from "../resources/ContactResource";
import LeadResource from "../resources/LeadResource";
import CompanyResource from "../resources/CompanyResource";
import TaskResource from "../resources/TaskResource";
import CustomerResource from "../resources/CustomerResource";

class NoteFactory extends EntityFactory {
  static entityClass = Note;
  static resourceClass = NoteResource;
  static behaviors = [ new Removable ];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = NoteResource.ELEMENT_TYPES;

    this.NOTE_TYPE = NoteResource.NOTE_TYPES;

    this.CALL_STATUS = NoteResource.CALL_STATUSES;
  }

  findById( id, type ) {
    return this._resource.findById( id, type )
      .then( response => {
        const attributes = response.getFirstItem();
        if ( !attributes ) {
          return;
        }
        return this.create( attributes );
      });
  }
}

export default NoteFactory;
