'use strict';
import http from 'http';
import https from 'https';

class PrivateRequest {
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
        form,
        secure = false
      } = this._options,
      driver = secure ? https : http;
    return new Promise(( resolve, reject ) => {
      const request = driver.request({
        hostname,
        path,
        method,
        headers
      }, this.onResponse( resolve, reject ));

      if ( form ) {
        form.pipe( request );
      }
      else if ( method !== 'GET' ) {
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
    const onResponseData = chunk => { rawData += chunk; console.log( chunk )},
      onRequestEnd = response => () => callback({ response, rawData });

    return response => {
      response.on( 'data', onResponseData );
      response.on( 'end', onRequestEnd( response ));
    };
  }

}

export default HTTPRequest;
