import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class ContactResource extends RemoveableEntityResource {
  static path = schema.entities.contacts.path;
  static deletePath = schema.entities.contacts.deletePath;
  static ENTITY_TYPE = 17;
}

export default ContactResource;
