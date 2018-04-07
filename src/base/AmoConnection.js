'use strict';

import schema from '../apiUrls.js';

class AmoConnection {

  constructor( request, options = {}) {
    this._request = request;
    this._options = options;
    this._isConnected = false;
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
      };

    if ( hash ) {
      data[ 'USER_HASH' ] = hash;
    } else if ( password ) {
      data[ 'USER_PASSWORD' ] = password;
    }

    return this._request.post( schema.auth, data, {
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
