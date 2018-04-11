import Company from '../activeRecords/Company';
import CompanyResource from '../resources/CompanyResource';
import EntityFactory from '../../base/factories/EntityFactory';
import Removable from "../../base/factories/behaviors/Removable";

class CompanyFactory extends EntityFactory {
  static entityClass = Company;
  static resourceClass = CompanyResource;
  static behaviors = [ new Removable ];
}

export default CompanyFactory;
