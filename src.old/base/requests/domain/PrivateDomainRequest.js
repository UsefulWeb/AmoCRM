import qs from 'qs';
import DomainRequest from './DomainRequest';
import HTTPRequest from '../common/HTTPRequest';
import PrivateDomainResponseHandler from '../../responseHandlers/PrivateDomainResponseHandler';

class PrivateDomainRequest extends DomainRequest {
  static responseHandlerClass = PrivateDomainResponseHandler;
  static NETWORK_PROTOCOL = 'https';

  request( url, data = {}, method = 'GET', options = {}) {
    if ( options.formData ) {
      return this.requestWithFormData( url, data, method, options );
    }
    return super.request( url, data, method, options );
  }

  requestWithFormData( url, data = {}, method = 'GET', options = {}) {
    const headers = {
      ...this.getDefaultHeaders( options ),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    const encodedData = qs.stringify( data ),
      request = this.createFormRequest( url, encodedData, method, headers );
    return this.addRequestToQueue( request, options.response );
  }

  createFormRequest(url, data = {}, method = 'GET', headers = {}) {
    const isGET = method === 'GET',
      protocol = this.constructor.NETWORK_PROTOCOL,
      secure = protocol === 'https',
      path = isGET ? url+'?'+this.encodeData( data ) : url,
      hostname = this._hostname;

    return new HTTPRequest({
      hostname,
      path,
      data,
      method,
      headers,
      secure
    });
  }
}

export default PrivateDomainRequest;
