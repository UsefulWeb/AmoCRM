import EntityFactory from '../../base/factories/EntityFactory';
import Pipeline from '../activeRecords/Pipeline';
import PipelineResource from '../resources/PipelineResource';

class PipelineFactory extends EntityFactory {
  static entityClass = Pipeline;
  static resourceClass = PipelineResource;
}

export default PipelineFactory;
