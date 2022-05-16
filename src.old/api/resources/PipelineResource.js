import schema from '../../routes/v2';
import EntityResource from '../../base/resources/EntityResource';

class PipelineResource extends EntityResource {
  static path = schema.entities.pipelines.path;
  static deletePath = schema.entities.pipelines.deletePath;

  remove( id ) {
    const { deletePath } = this.constructor;
    return this.request( 'POST', deletePath, { id });
  }
}

export default PipelineResource;
