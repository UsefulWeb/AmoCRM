'use strict';
import HTTPSRequest from './HTTPSRequest';
import Queue from 'promise-queue';

import qs from 'qs';
import { parseString } from 'xml2js';

class AmoRequest {
  static DEFAULT_USER_AGENT = 'amoCRM-API-client/1.0';

  constructor( domain ) {
    this._queue = new Queue( 1 );
    this._cookies = [];
    this._hostname = domain + '.amocrm.ru';
  }

  post( url, data = {}, options = {}) {
    return this.request( url, data, 'POST', options );
  }

  get( url, data = {}, options = {}) {
    return this.request( url, data, 'GET', options );
  }

  request( url, data = {}, method = 'GET', options = {}) {
    const encodedData = this.encodeData( url, data, method, options ),
      headers = this.getHeaders( url, encodedData, method, options ),
      request = this.createRequest( url, encodedData, method, headers );

    return this._queue.add(() => {
      return request.send()
        .then( response => this.handleResponse( response, options.response ))
    });
  }

  encodeData( url, data = {}, method = 'GET', options = {}) {
    const isGET = method === 'GET';

    return isGET ? qs.stringify( data ) : JSON.stringify( data );
  }

  getHeaders( url, encodedData = '', method = 'GET', options = {}) {
    const isGET = method === 'GET',
      headers = Object.assign({}, options.headers, {
        'Cookie': this._cookies.join(),
        'User-Agent': this.constructor.DEFAULT_USER_AGENT,
      });

    if ( !isGET && encodedData ) {
      headers[ 'Content-Length' ] = Buffer.byteLength( encodedData );
    }
    return headers;
  }

  handleResponse({ rawData, response }, options = {}) {
    if ( options.saveCookies ) {
      this._cookies = response.headers[ 'set-cookie' ];
    }

    if ( options.dataType === 'xml' ) {
      return new Promise(( resolve, reject ) => {
        parseString( rawData, ( err, data ) => {
          if ( err ) {
            return reject( err );
          }
          resolve( data );
        });
      });
    }
    const data = JSON.parse( rawData );
    return Promise.resolve( data );
  }

  createRequest(url, encodedData = '', method = 'GET', headers = {}) {
    const isGET = method === 'GET',
      path = isGET ? `${url}?${encodedData}`: url;

    return new HTTPSRequest({
      path,
      hostname: this._hostname,
      headers,
      method,
      data: encodedData
    })
  }
} 

export default AmoRequest;
