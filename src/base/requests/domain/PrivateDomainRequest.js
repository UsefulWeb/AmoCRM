import qs from 'qs';
import DomainRequest from './DomainRequest';
import AjaxRequest from '../common/UnirestRequest';
import PrivateDomainResponseHandler from '../../responseHandlers/PrivateDomainResponseHandler';

class PrivateDomainRequest extends DomainRequest {
  static responseHandlerClass = PrivateDomainResponseHandler;
  static NETWORK_PROTOCOL = 'https';

  request( url, data = {}, method = 'GET', options = {}) {
    if ( options.formData ) {
      this.requestWithFormData( url, data, method, options );
    }
    return super.request( url, data, method, options );
  }

  requestWithFormData( url, data = {}, method = 'GET', options = {}) {
    const headers = this.getDefaultHeaders( options.headers );
    headers[ 'X-Requested-With' ] = 'XMLHttpRequest';
    const request = this.createUnirestRequest( url, data, method, headers );

    return this.addRequestToQueue( request, options.response );
  }

  createUnirestRequest(path, data = {}, method = 'GET', headers = {}) {
    const isGET = method === 'GET',
      protocol = this.constructor.NETWORK_PROTOCOL,
      params = isGET ? '?'+this.encodeData( data ) : '',
      url = `${protocol}://${this._hostname}${path}${params}`;

    return new AjaxRequest({
      url,
      headers,
      method,
      data
    });
  }
}

export default PrivateDomainRequest;
