import Contact from '../activeRecords/Contact';
import ContactResource from '../resources/ContactResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from '../../base/factories/behaviors/Removable';

class ContactFactory extends EntityFactory {
  static entityClass = Contact;
  static resourceClass = ContactResource;
  static behaviors = [ new Removable ];
}

export default ContactFactory;
