import EntityFactory from '../../base/factories/EntityFactory';
import Customer from '../activeRecords/Customer';
import CustomerResource from '../resources/CustomerResource';
import HasFields from "../../base/factories/behaviors/HasFields";

class CustomerFactory extends EntityFactory {
  static activeRecordClass = Customer;
  static resourceClass = CustomerResource;

  static behaviors = [ ...EntityFactory.behaviors, new HasFields ];
}

export default CustomerFactory;
