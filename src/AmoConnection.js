'use strict';

class AmoConnection {
  static AUTH_URL = '/private/api/auth.php?type=json';

  constructor( options = {}) {
    this._options = options;
    this._isConnected = false;
  }

  set request( request ) {
    this._request = request;
  }

  get connected() {
    return this._isConnected;
  }

  connect() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }
    const { login, password, hash } = this._options,
      data = {
        USER_LOGIN: login
      },
      url = this.constructor.AUTH_URL;

    if ( hash ) {
      data[ 'USER_HASH' ] = hash;
    }
    else if ( password ) {
      data[ 'USER_PASSWORD' ] = password;
    }

    return this._request.post( url, data, {
      headers: { 'Content-Type': 'application/json' },
      response: {
        dataType: 'json',
        saveCookies: true
      }
    })
    .then( data => {
      this._isConnected = data.response.auth === true;
      return this._isConnected;
    })
    .catch( e => {
      throw new Error( 'Connection Error!' );
    });
  }
}
module.exports = AmoConnection;
