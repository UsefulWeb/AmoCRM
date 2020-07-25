'use strict';
import http from 'http';
import https from 'https';

class HTTPRequest {
  constructor( options ) {
    this._options = options;
  }

  send() {
    const {
        hostname,
        path,
        method = 'GET',
        headers = {},
        data = '',
        secure = false
      } = this._options,
      driver = secure ? https : http,
      isGET = method === 'GET';
    return new Promise(( resolve, reject ) => {
      const request = driver.request({
        hostname,
        path,
        method,
        headers
      }, this.onResponse( resolve, reject ));
      if ( !isGET ) {
        request.write( data );
      }
      request.on( 'error', this.onError( reject ));
      request.end();
    });
  }

  onError( callback ) {
    return ({ error }) => callback( error );
  }

  onResponse( callback ) {
    let rawData = '';
    const onResponseData = chunk => rawData += chunk,
      onRequestEnd = response => () => callback({ response, rawData });

    return response => {
      response.on( 'data', onResponseData );
      response.on( 'end', onRequestEnd( response ));
    };
  }

}

export default HTTPRequest;
