import schema from '../../apiUrls';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class CustomerResource extends RemoveableEntityResource {
  static path = schema.entities.customers.path;
  static deletePath = schema.entities.customers.deletePath;
}

export default CustomerResource;
