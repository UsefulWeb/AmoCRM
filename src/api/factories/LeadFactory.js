import Lead from '../activeRecords/Lead';
import LeadResource from '../resources/LeadResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from "../../base/factories/behaviors/Removable";
import RemovableById from "../../base/factories/behaviors/RemovableById";

class LeadFactory extends EntityFactory {
  static activeRecordClass = Lead;
  static resourceClass = LeadResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable, new RemovableById ];
}

export default LeadFactory;
