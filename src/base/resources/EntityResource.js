import RemoteResource from './RemoteResource';

class EntityResource extends RemoteResource {

  static path;

  findById( id ) {
    return this.find({ id });
  }

  find( query = {}) {
    const { path } = this.constructor;
    return this.request( 'GET', path, query );
  }

  insert( data=[]) {
    const { path } = this.constructor;
    return this.request( 'POST', path, {
      add: data
    });
  }

  update( data=[]) {
    const { path } = this.constructor;
    return this.request( 'POST', path, {
      update: data
    });
  }

  remove( data=[]) {
    const { path } = this.constructor;
    return this.request( 'POST', path, {
      delete: data
    });
  }
}

export default EntityResource;
