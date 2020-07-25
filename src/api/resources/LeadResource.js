import EntityResource from '../../base/resources/EntityResource';
import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class LeadResource extends RemoveableEntityResource {
  static path = schema.entities.leads.path;
  static deletePath = schema.entities.leads.deletePath;
  static ENTITY_TYPE = 2;
}

export default LeadResource;
