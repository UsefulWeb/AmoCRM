import EntityResource from '../../base/resources/EntityResource';
import schema from '../../apiUrls';

class LeadResource extends EntityResource {
  static path = schema.entities.leads;
}

export default LeadResource;
