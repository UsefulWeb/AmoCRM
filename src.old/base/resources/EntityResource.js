import RemoteResource from './RemoteResource';
import EntityResponseHandler from "../responseHandlers/EntityResponseHandler";
import schema from '../../routes/v2';

class EntityResource extends RemoteResource {

  static path;
  static getPath;
  static insertPath;
  static updatePath;
  static multiactionsPath = schema.multiactions;

  static responseHandlerClass = EntityResponseHandler;

  static ENTITY_TYPE;
  static DELETE_MULTIACTION_TYPE = 4;

  findById( id ) {
    return this.find({ id });
  }

  find( query = {}) {
    const { path, getPath } = this.constructor;
    return this.request( 'GET', getPath || path, query );
  }

  insert( data=[]) {
    const { insertPath, path } = this.constructor;
    return this.request( 'POST', insertPath || path, {
      add: data
    });
  }

  update( data=[]) {
    const { path, updatePath } = this.constructor;
    return this.request( 'POST', updatePath || path, {
      update: data
    });
  }

  multiactions( ids, data= {}, multiaction_type ) {
    const { multiactionsPath, ENTITY_TYPE } = this.constructor;
    return this.request( 'POST', multiactionsPath,
      {
        request: {
          multiactions: {
            add: [
              {
                entity_type: ENTITY_TYPE,
                multiaction_type,
                data,
                ids
              }
            ]
          }
        }
      },
      {
        formData: true
      }
    );
  }
}

export default EntityResource;
