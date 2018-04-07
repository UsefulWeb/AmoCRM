class ResponseHandler {
  static errorHandlerClass;

  constructor( response ) {
    const { errorHandlerClass } = this.constructor;
    this._response = response;
    if ( errorHandlerClass ) {
      const errorHandler = new errorHandlerClass( response );
      errorHandler.handleErrors( response );
    }
  }

  getRaw() {
    return this._response;
  }
}

export default ResponseHandler;
