import RemoteResource from './RemoteResource';
import EntityResponseHandler from "../responseHandlers/EntityResponseHandler";

class EntityResource extends RemoteResource {

  static path;
  static getPath;
  static insertPath;
  static updatePath;

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
}

export default EntityResource;
