import Contact from '../activeRecords/Contact';
import ContactResource from '../resources/ContactResource';
import RemovableEntityFactory from '../../base/factories/RemovableEntityFactory';

class ContactFactory extends RemovableEntityFactory {
  static entityClass = Contact;
  static resourceClass = ContactResource;
}

export default ContactFactory;
