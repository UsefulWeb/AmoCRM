import EntityFactory from '../../base/factories/EntityFactory';
import Pipeline from '../activeRecords/Pipeline';
import PipelineResource from '../resources/PipelineResource';
import Removable from "../../base/factories/behaviors/Removable";

/**
 * @mixes Removable
 */
class PipelineFactory extends EntityFactory {
  static activeRecordClass = Pipeline;
  static resourceClass = PipelineResource;
  static behaviors = [ ...EntityFactory.behaviors, new Removable ];
}

export default PipelineFactory;
