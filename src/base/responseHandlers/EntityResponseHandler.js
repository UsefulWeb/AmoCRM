import ResponseHandler from './ResponseHandler';
import EntityErrorResponseHandler from '../errorHandlers/EntityResponseErrorHandler';

class EntityResponseHandler extends ResponseHandler {
  static errorHandlerClass = EntityErrorResponseHandler;

  getItems() {
    const items = this._response._embedded && this._response._embedded.items;
    return items || [];
  }

  getFirstItem() {
    return this.getItems()[ 0 ] || {};
  }
}

export default EntityResponseHandler;
