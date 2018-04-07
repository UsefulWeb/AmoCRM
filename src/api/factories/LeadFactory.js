import EntityFactory from '../../base/factories/EntityFactory';
import Lead from '../entities/Lead';
import LeadResource from '../resources/LeadResource';

class LeadFactory extends EntityFactory {
  static entityClass = Lead;
  static resourceClass = LeadResource;
}

export default LeadFactory;
