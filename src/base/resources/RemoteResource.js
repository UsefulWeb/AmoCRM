import BehaviorFactory from '../BehaviorFactory';

class RemoteResource {
  static behaviors = [];
  static responseHandlerClass;
  /**
   * @param request {DomainRequest}
   */
  constructor( request ) {
    this._request = request;
    BehaviorFactory.assignBehaviors( this, this.constructor.behaviors );
  }

  static createFrom( resourceInstance ) {
    return new this.constructor( resourceInstance.getDomainRequest());
  }

  getDomainRequest() {
    return this._request;
  }

  transformTo( resourceClass ) {
    return new resourceClass( this._request );
  }

  request( method, path, data, options ) {
    return this._request.request( path, data, method, options )
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
