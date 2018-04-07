import ResponseHandler from './ResponseHandler';
import EntityErrorResponseHandler from '../errorHandlers/EntityErrorResponseHandler';

class EntityResponseHandler extends ResponseHandler {
  static errorHandlerClass = EntityErrorResponseHandler;
  getItems() {
    return this._response._embedded.items;
  }

  getFirstItem() {
    return this.getItems()[ 0 ];
  }
}

export default EntityResponseHandler;
