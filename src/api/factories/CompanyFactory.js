import Company from '../activeRecords/Company';
import CompanyResource from '../resources/CompanyResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from "../../base/factories/behaviors/Removable";
import HasFields from "../../base/factories/behaviors/HasFields";

/**
 * @mixes Removable
 * @mixes HasFields
 */
class CompanyFactory extends EntityFactory {
  static activeRecordClass = Company;
  static resourceClass = CompanyResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable, new HasFields ];
}

export default CompanyFactory;
