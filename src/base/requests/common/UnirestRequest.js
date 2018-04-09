'use strict';
import unirest from 'unirest';

class UnirestRequest {
  constructor( options ) {
    this._options = options;
  }

  send() {
    const { url, method = 'GET', headers = {}, data = {} } = this._options;
    return new Promise(( resolve, reject ) => {
      const request = unirest( method, url );
      request.headers( headers );
      request.form( data );

      request.end( response => {
        if ( response.error ) {
          return this.onError( reject )( response );
        }
        resolve({
          rawData: response.raw_body,
          response
        });
      });
    });
  }

  onError( callback ) {
    return ({ error }) => callback( error );
  }

}

export default UnirestRequest;
