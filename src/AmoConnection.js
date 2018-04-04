'use strict';

const AmoRequest = require( './AmoRequest.js' );

class AmoConnection {
  static AUTH_URL = '/private/api/auth.php?type=json';

  constructor( options = {}) {
    this._options = options;
    this._isConnected = false;
    this._request = new AmoRequest( options.domain );
  }

  set request( request ) {
    this._request = request;
  }

  get connected() {
    return this._isConnected;
  }

  establish() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }
    const data = {},
      { login, password, hash } = this._options,
      _static = this.constructor;

    data[ 'USER_LOGIN' ] = login;

    if ( password !== undefined ) {
      data[ 'USER_PASSWORD' ] = password;
    } else if ( hash !== undefined ) {
      data[ 'USER_HASH' ] = hash;
    }

    return this._request.get( _static.AUTH_URL, data, {
      headers: { 'Content-Type': 'application/json' },
      saveCookie: true
    })
    .then(() => {
      this._isConnected = true;
      return true;
    })
    .catch( e => {
      throw new Error( 'Connection Error!' );
    });
  }
}
module.exports = AmoConnection;
