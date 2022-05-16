import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class CustomerResource extends RemoveableEntityResource {
  static path = schema.entities.customers.path;
  static deletePath = schema.entities.customers.deletePath;
}

export default CustomerResource;
