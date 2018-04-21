import RemoteResource from '../../base/resources/RemoteResource';
import schema from '../../apiUrls';

export default class IncomingLeadResource extends RemoteResource {

  find( criteria={}) {
    return this.apiRequest( 'GET', schema.unsorted.get, criteria );
  }

  summary( criteria={}) {
    return this.apiRequest( 'GET', schema.unsorted.summary, criteria );
  }

  insertAsSIP( data = []) {
    return this.apiRequest( 'POST', schema.unsorted.addFromSIP, { add: data });
  }

  insertAsFormData( data = []) {
    return this.apiRequest( 'POST', schema.unsorted.addFromForm, { add: data });
  }

  accept( data = {}) {
    return this.apiRequest( 'POST', schema.unsorted.accept, data );
  }

  decline( data = {}) {
    return this.apiRequest( 'POST', schema.unsorted.decline, data );
  }
}
