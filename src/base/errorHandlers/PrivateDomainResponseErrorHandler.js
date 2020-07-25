import EntityResponseErrorHandler from "./EntityResponseErrorHandler";

class PrivateDomainResponseErrorHandler extends EntityResponseErrorHandler {

  getErrorsData() {
    const { status } = this._response;
    if ( status && status >= 400 && this._response.detail ) {
      return [ this._response.detail ];
    }
    // for multiactions
    if ( this._response.response && this._response.response.multiactions ) {
      return this._response.response.multiactions.set.errors;
    }
    // for ajax requests (single id like lead remove )
    if ( this._response.ERRORS ) {
      return this._response.ERRORS;
    }
    return super.getErrorsData();
  }

  hasErrors() {
    const errors = this.getErrorsData();
    if ( Array.isArray( errors ) && errors.length > 0 ) {
      return true;
    }
    return Boolean( errors );
  }

  getFirstError() {
    const errors = this.getErrorsData();
    if ( Array.isArray( errors )) {
      const [ message ] = errors;
      return new Error( message );
    }
    return super.getFirstError();
  }
}

export default PrivateDomainResponseErrorHandler;
