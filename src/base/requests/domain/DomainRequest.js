'use strict';
import Queue from 'promise-queue';
import qs from 'qs';

import HTTPRequest from '../common/HTTPRequest';
import DomainResponseHandler from '../../responseHandlers/DomainResponseHandler'

class DomainRequest {
  static responseHandlerClass = DomainResponseHandler;
  static DEFAULT_USER_AGENT = 'amoCRM-API-client/1.0';

  constructor( domain, login, apiKey ) {
    if ( !domain ) {
      throw new Error( 'Portal domain must be set!' );
    }
    this._apiParams = {
      login,
      api_key: apiKey
    };
    this._login = login;
    this._apiKey = apiKey;
    this._queue = new Queue( 1 );
    this._cookies = [];
    this._hostname = domain.includes( '.' ) ? domain : domain + '.amocrm.ru';
  }

  get expires() {
    const cookie = this._cookies.find(
      contents => contents.includes( 'expires=' )
    );
    if (!cookie) {
      return;
    }

    const dateStr = cookie.split( '; ' ).find(
      contents => contents.includes( 'expires=' )
    ).replace( 'expires=', '' );

    return new Date( dateStr );
  }

  post( url, data = {}, options = {}) {
    return this.request( url, data, 'POST', options );
  }

  get( url, data = {}, options = {}) {
    return this.request( url, data, 'GET', options );
  }

  request( url, data = {}, method = 'GET', options = {}) {
    url = this.getUrl( url, data, method, options );
    const encodedData = this.encodeData( url, data, method, options ),
      headers = this.getRequestHeaders( url, encodedData, method, options ),
      request = this.createRequest( url, encodedData, method, headers );
    return this.addRequestToQueue( request, options.response );
  }

  getUrl( url, data = {}, method = 'GET', options = {}) {
    if ( !options.useAPIAuth || method === 'GET' ) {
      return url;
    }

    return url + '?' + qs.stringify( this._apiParams );
  }

  addRequestToQueue( request, options ) {
    return this._queue.add(() => {
      return request.send()
        .then( response => this.handleResponse( response, options ));
    });
  }

  encodeData( url, data = {}, method = 'GET', options = {}) {
    const isGET = method === 'GET',
      params = Object.assign( {}, data );

    if ( isGET && options.useAPIAuth ) {
      Object.assign( params, this._apiParams );
    }

    return isGET ? qs.stringify( params ) : JSON.stringify( params );
  }

  getDefaultHeaders( headers ) {
    return Object.assign({}, headers, {
      'Cookie': this._cookies.join(),
      'User-Agent': this.constructor.DEFAULT_USER_AGENT
    })
  }

  getRequestHeaders(url, encodedData = '', method = 'GET', options = {}) {
    const isGET = method === 'GET',
      headers = this.getDefaultHeaders( options.headers );

    if ( !isGET && encodedData ) {
      headers[ 'Content-Length' ] = Buffer.byteLength( encodedData );
    }
    return headers;
  }

  handleResponse({ rawData, response }, options = {}) {
    const { responseHandlerClass } = this.constructor;
    if ( options.saveCookies ) {
      this._cookies = response.headers[ 'set-cookie' ] || [];
    }
    const handler = new responseHandlerClass( rawData );
    return handler.toJSON( options );
  }

  createRequest(url, encodedData = '', method = 'GET', headers = {}) {
    const isGET = method === 'GET',
      path = isGET ? `${url}?${encodedData}`: url;
    return new HTTPRequest({
      path,
      hostname: this._hostname,
      headers,
      method,
      data: encodedData,
      secure: true
    });
  }
}

export default DomainRequest;
