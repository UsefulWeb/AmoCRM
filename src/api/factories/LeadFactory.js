import Lead from '../activeRecords/Lead';
import LeadResource from '../resources/LeadResource';
import RemovableEntityFactory from '../../base/factories/RemovableEntityFactory';

class LeadFactory extends RemovableEntityFactory {
  static entityClass = Lead;
  static resourceClass = LeadResource;
}

export default LeadFactory;
