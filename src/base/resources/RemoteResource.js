import BehaviorFactory from '../BehaviorFactory';

class RemoteResource {
  static behaviors = [];
  static responseHandlerClass;
  /**
   * @param connection {AmoConnection}
   */
  constructor( connection ) {
    this._connection = connection;
    BehaviorFactory.assignBehaviors( this, this.constructor.behaviors );
  }

  static createFrom( resourceInstance ) {
    return new this.constructor( resourceInstance.getDomainRequest());
  }

  get connection() {
    return this._connection;
  }

  transformTo( resourceClass ) {
    return new resourceClass( this._connection );
  }

  request( method, path, data, options ) {
    return this._connection.request( path, data, method, options )
      .then( response => this.handleResponse( response ));
  }

  handleResponse( response ) {
    const { responseHandlerClass } = this.constructor;
    if ( !responseHandlerClass ) {
      return response;
    }
    return new responseHandlerClass( response );
  }

  apiRequest( method, path, data, options = {}) {
    return this.request( method, path, data, {
      ...options,
      useAPIAuth: true
    })
  }
}

export default RemoteResource;
