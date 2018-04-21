class ResponseErrorHandler {
  constructor( response ) {
    this._response = response;
  }

  handleErrors() {
    if ( !this.hasErrors()) {
      return;
    }
    throw this.getFirstError();
  }
}

export default ResponseErrorHandler;
