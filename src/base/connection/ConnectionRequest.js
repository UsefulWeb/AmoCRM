class ConnectionRequest {
  /**
   *
   * @param {Connection} connection
   */
  constructor( connection ) {
    this._connection = connection;
  }

  get( url, data, options ) {
    return this._connection.request( url, data, 'GET', options );
  }

  post( url, data, options ) {
    return this._connection.request( url, data, 'POST', options );
  }
}

export default ConnectionRequest;
