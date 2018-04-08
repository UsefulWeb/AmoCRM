
class RemoteResource {
  static responseHandlerClass;
  /**
   * @param request {DomainRequest}
   */
  constructor( request ) {
    this._request = request;
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
