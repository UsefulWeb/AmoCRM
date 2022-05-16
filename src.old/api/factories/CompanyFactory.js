import EntityFactory from '../../base/factories/EntityFactory';
import Company from '../activeRecords/Company';
import CompanyResource from '../resources/CompanyResource';

class CompanyFactory extends EntityFactory {
  static entityClass = Company;
  static resourceClass = CompanyResource;
}

export default CompanyFactory;
