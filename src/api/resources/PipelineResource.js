import schema from '../../apiUrls';
import EntityResource from '../../base/resources/EntityResource';
import Findable from "../../base/resources/behaviors/Findable";
import PipelineResponseHandler from "../responseHandlers/PipelineResponseHandler";

class PipelineResource extends EntityResource {
  static path = schema.entities.pipelines.path;
  static getPath = schema.entities.pipelines.getPath;
  static deletePath = schema.entities.pipelines.deletePath;

  static responseHandlerClass = PipelineResponseHandler;
  static behaviors = [ new Findable ];

  findById( id ) {
    return this.find()
      .then( response => response.getItems())
      .then( items => items.filter( item => id === item.id ))
      .then( response => this.handleResponse( response ));
  }

  insert( data=[]) {
    const { insertPath, path } = this.constructor;
    return this.request( 'POST', insertPath || path, {
      request: {
        pipelines: {
          add: data
        }
      }
    });
  }

  update( data = []) {
    const { path, updatePath } = this.constructor,
      pipelinesData = data.reduce(( target, item ) => {
        target[ item.id ] = item;
        return target;
      }, {});

    return this.request( 'POST', updatePath || path, {
      request: {
        pipelines: {
          update: pipelinesData
        }
      }
    });
  }

  remove( ids = []) {
    const { deletePath } = this.constructor;
    return this.request( 'POST', deletePath, {
      request: {
        id: ids
      }
    });
  }
}

export default PipelineResource;
