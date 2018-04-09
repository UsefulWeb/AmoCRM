import EntityFactory from '../../base/factories/EntityFactory';
import Contact from '../activeRecords/Contact';
import ContactResource from '../resources/ContactResource';

class ContactFactory extends EntityFactory {
  static entityClass = Contact;
  static resourceClass = ContactResource;
}

export default ContactFactory;
