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
    return new this.constructor( resourceInstance.getDomainrequest());
  }

  getDomainrequest() {
    return this._request;
  }

  transformTo( resourceClass ) {
    return new resourceClass( this._request );
  }

  request( method, path, data, options ) {
    const { responseHandlerClass } = this.constructor;
    return this._request.request( path, data, method, options )
      .then( response => {
        if ( !responseHandlerClass ) {
          return response;
        }
        return new responseHandlerClass( response );
      });
  }
}

export default RemoteResource;
