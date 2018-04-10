import Company from '../activeRecords/Company';
import CompanyResource from '../resources/CompanyResource';
import RemovableEntityFactory from '../../base/factories/RemovableEntityFactory';

class CompanyFactory extends RemovableEntityFactory {
  static entityClass = Company;
  static resourceClass = CompanyResource;
}

export default CompanyFactory;
