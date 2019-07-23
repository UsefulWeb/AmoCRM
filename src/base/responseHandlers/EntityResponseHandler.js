import ResponseHandler from './ResponseHandler';
import EntityErrorResponseHandler from '../errorHandlers/EntityResponseErrorHandler';

class EntityResponseHandler extends ResponseHandler {
  static errorHandlerClass = EntityErrorResponseHandler;

  getItems() {
    const { response } = this._response;
    if ( response && response.items ) {
      return response.items;
    }

    const { _embedded } = this._response._embedded;

    if ( _embedded && _embedded.items ) {
      return _embedded.items;
    }

    return [];
  }

  getFirstItem() {
    return this.getItems()[ 0 ];
  }
}

export default EntityResponseHandler;
