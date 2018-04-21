import ResponseHandler from './ResponseHandler';
import EntityErrorResponseHandler from '../errorHandlers/EntityResponseErrorHandler';

class EntityResponseHandler extends ResponseHandler {
  static errorHandlerClass = EntityErrorResponseHandler;

  getEmbedded() {
    return this._response._embedded;
  }

  getItems() {
    const embedded = this.getEmbedded(),
      items = embedded && embedded.items;
    return items || [];
  }

  getFirstItem() {
    return this.getItems()[ 0 ];
  }
}

export default EntityResponseHandler;
