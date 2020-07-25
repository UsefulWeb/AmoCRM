import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class FieldResource extends RemoveableEntityResource {
  static path = schema.entities.fields.path;
  static getPath = schema.account;
  static deletePath = schema.entities.fields.deletePath;
}

export default FieldResource;
