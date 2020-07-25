import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class CompanyResource extends RemoveableEntityResource {
  static path = schema.entities.companies.path;
  static deletePath = schema.entities.companies.deletePath;
}

export default CompanyResource;
