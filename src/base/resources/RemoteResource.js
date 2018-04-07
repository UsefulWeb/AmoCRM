
class RemoteResource {
  /**
   * @param request {AmoRequest}
   * @param responseHandler {ResponseHandler}
   */
  constructor( request, responseHandler ) {
    this._request = request;
    this._responseHandler = responseHandler;
  }

  request( method, path, data ) {
    return this._request.request( path, data, method )
      .then( response => {
        if ( !this._responseHandler ) {
          return response;
        }
        return new this._responseHandler( response );
      });
  }
}

export default RemoteResource;
