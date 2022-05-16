import Field from '../activeRecords/Field';
import FieldResource from '../resources/FieldResource';
import ResourceFactory from '../../base/factories/ResourceFactory';

class FieldFactory extends ResourceFactory {
  static entityClass = Field;
  static resourceClass = FieldResource;
}

export default FieldFactory;
