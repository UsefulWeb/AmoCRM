import EntityFactory from '../../base/factories/EntityFactory';
import Note from '../activeRecords/Note';
import NoteResource from '../resources/NoteResource';

class NoteFactory extends EntityFactory {
  static entityClass = Note;
  static resourceClass = NoteResource;
}

export default NoteFactory;
