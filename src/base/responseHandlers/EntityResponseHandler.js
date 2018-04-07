import ResponseHandler from './ResponseHandler';

class EntityResponseHandler extends ResponseHandler {

  getItems() {
    return this._response._embedded.items;
  }

  getFirstItem() {
    return this.getItems()[ 0 ];
  }
}

export default EntityResponseHandler;
