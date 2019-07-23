import Contact from '../activeRecords/Contact';
import ContactResource from '../resources/ContactResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from '../../base/factories/behaviors/Removable';
import Filterable from "../../base/factories/behaviors/Filterable";

class ContactFactory extends EntityFactory {
  static activeRecordClass = Contact;
  static resourceClass = ContactResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable, new Filterable ];
}

export default ContactFactory;
