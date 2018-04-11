import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Removable from "../../base/resources/behaviors/PrivateRemovable";
import HasMultiactions from "../../base/resources/behaviors/HasMultiactions";

class NoteResource extends EntityResource {
  static path = schema.entities.notes.path;
  static deletePath = schema.entities.notes.deletePath;
  static ENTITY_TYPE = 2;
  static behaviors = [ new Removable, new HasMultiactions ];
}

export default NoteResource;
