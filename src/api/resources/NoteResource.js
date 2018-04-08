import schema from '../../apiUrls';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class NoteResource extends RemoveableEntityResource {
  static path = schema.entities.notes.path;
  static deletePath = schema.entities.notes.deletePath;
}

export default NoteResource;
