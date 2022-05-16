class ResponseErrorHandler {
  constructor( response, responseInfo ) {
    this._response = response;
    this._responseInfo = responseInfo;
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
