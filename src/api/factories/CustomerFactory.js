import EntityFactory from '../../base/factories/EntityFactory';
import Customer from '../activeRecords/Customer';
import CustomerResource from '../resources/CustomerResource';

class CustomerFactory extends EntityFactory {
  static activeRecordClass = Customer;
  static resourceClass = CustomerResource;
}

export default CustomerFactory;
