import schema from '../../apiUrls';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class CompanyResource extends RemoveableEntityResource {
  static path = schema.entities.companies.path;
  static ENTITY_TYPE = 3;
}

export default CompanyResource;
