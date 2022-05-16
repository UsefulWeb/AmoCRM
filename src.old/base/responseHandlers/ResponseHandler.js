class ResponseHandler {
  static errorHandlerClass;

  constructor( responseData, responseInfo ) {
    const { errorHandlerClass } = this.constructor;
    this._response = responseData;
    this._responseInfo = responseInfo;
    if ( errorHandlerClass ) {
      const errorHandler = new errorHandlerClass( responseData, responseInfo );
      errorHandler.handleErrors();
    }
  }

  getRaw() {
    return this._response;
  }
}

export default ResponseHandler;
