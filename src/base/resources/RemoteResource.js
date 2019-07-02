
class RemoteResource {
  static responseHandlerClass;
  /**
   * @param connection {AmoConnection}
   */
  constructor( connection ) {
    this._connection = connection;
  }

  request( method, path, data, options ) {
    const { responseHandlerClass } = this.constructor;
    return this._connection.request( path, data, method, options )
      .then( response => {
        if ( !responseHandlerClass ) {
          return response;
        }
        return new responseHandlerClass( response );
      });
  }
}

export default RemoteResource;
