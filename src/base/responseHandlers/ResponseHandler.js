class ResponseHandler {
  constructor( response ) {
    this._response = response;
  }

  getRaw() {
    return this._response;
  }
}

export default ResponseHandler;
