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

  getErrorsData() {
    return true;
  }

  hasErrors() {
    return false;
  }

  getFirstError() {
    return new Error( 'Parse response error' );
  }
}

export default ResponseErrorHandler;
