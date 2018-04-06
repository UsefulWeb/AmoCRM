'use strict';
import https from 'https';

class HTTPSRequest {
  constructor( options ) {
    this._options = options;
  }

  send() {
    const { hostname, path, method = 'GET', headers = {}, data = '' } = this._options;
    return new Promise(( resolve, reject ) => {
      const request = https.request({
        hostname,
        path,
        method,
        headers,
        port: 443,
      }, this.onResponse( resolve, reject ));

      if ( method !== 'GET' ) {
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

export default HTTPSRequest;
