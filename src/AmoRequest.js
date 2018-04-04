'use strict';
import HTTPSRequest from "./HTTPSRequest";

import qs from 'qs';
import { parseString } from 'xml2js';

class AmoRequest {
  static REQUEST_TIMEOUT = 1000 * 60;
  static REQUEST_CHECK_INTERVAL = 100;
  static DEFAULT_USER_AGENT = 'amoCRM-API-client/1.0';

  constructor( domain ) {
    this._isBusy = false;
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
    const isAjax = url.indexOf( '/ajax' ) === 0,
      isGET = method === 'GET';

    const encodedData = isAjax || isGET ? qs.stringify( data ) : JSON.stringify( data ),
      headers = Object.assign({}, options.headers, {
        'Cookie': this._cookies.join(),
        'User-Agent': this.constructor.DEFAULT_USER_AGENT,
      });

    if ( isAjax ) {
      headers[ 'X-Requested-With' ] = 'XMLHttpRequest';
    }

    if ( isGET ) {
      url += '?' + encodedData;
    } else if ( Object.keys( data ).length ) {
      headers[ 'Content-Length' ] = Buffer.byteLength( encodedData );
    }

    return this.beginRequest()
      .then(() => this.makeRequest( url, encodedData, method, headers ))
      .then( response => this.handleResponse( response, options.response ))
      .then( response => this.endRequest( response ));
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

  beginRequest() {
    const checkInterval = this.constructor.REQUEST_CHECK_INTERVAL,
      timeout = this.constructor.REQUEST_TIMEOUT;
    let waitTime = timeout;

    return new Promise(( resolve, reject ) => {
      const timer = () => {
        if ( !this._isBusy ) {
          resolve();
          return;
        }
        waitTime -= checkInterval;
        if ( waitTime > 0 ) {
          return setTimeout( timer, 100 );
        }
        reject( new Error( `Maximum waiting time limit reached: (${timeout} ms.)` ));
      };
      timer();
    })
    .then(() => {
      this._isBusy = true;
    });
  }

  endRequest( data ) {
    this._isBusy = false;
    return data;
  }

  makeRequest( url, data = {}, method = 'GET', headers = {}) {
    return HTTPSRequest.send({
      path: url,
      hostname: this._hostname,
      headers,
      method,
      data
    })
  }
}

export default AmoRequest;
