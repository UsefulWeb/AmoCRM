import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';

class FieldResource extends EntityResource {
  static path = schema.entities.fields.path;
  static getPath = schema.account;
  static deletePath = schema.entities.fields.deletePath;
}

export default FieldResource;
